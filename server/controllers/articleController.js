const Article = require('../models/Article');
const { getMongoStatus, getLocalDb, saveLocalDb } = require('../config/db');

// @desc    Get all educational articles & awareness materials
// @route   GET /api/articles
// @access  Public
const getArticles = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    if (getMongoStatus()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { summary: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ];
      }

      const articles = await Article.find(query).sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: articles.length,
        data: articles
      });
    } else {
      const db = getLocalDb();
      let list = db.articles || [];

      if (category && category !== 'All') {
        list = list.filter((a) => a.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q) ||
            a.content.toLowerCase().includes(q)
        );
      }

      return res.json({
        success: true,
        count: list.length,
        data: list
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single article by ID
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res, next) => {
  try {
    if (getMongoStatus()) {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }
      return res.json({ success: true, data: article });
    } else {
      const db = getLocalDb();
      const article = (db.articles || []).find((a) => a._id === req.params.id);
      if (!article) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }
      return res.json({ success: true, data: article });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new article
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = async (req, res, next) => {
  try {
    const { title, category, summary, content, readTime, author, keyTakeaways, dangerLevel } = req.body;

    if (!title || !category || !summary || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, summary, and content'
      });
    }

    const articleData = {
      title,
      category,
      summary,
      content,
      readTime: readTime || '4 min read',
      author: author || 'CSP Digital Awareness Cell',
      keyTakeaways: Array.isArray(keyTakeaways) ? keyTakeaways : [],
      dangerLevel: dangerLevel || 'Medium',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (getMongoStatus()) {
      const created = await Article.create(articleData);
      return res.status(201).json({
        success: true,
        message: 'Article published successfully',
        data: created
      });
    } else {
      const db = getLocalDb();
      const localArticle = {
        _id: 'art_' + Date.now() + Math.random().toString(36).substring(2, 6),
        ...articleData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.articles = db.articles || [];
      db.articles.unshift(localArticle);
      saveLocalDb(db);

      return res.status(201).json({
        success: true,
        message: 'Article published successfully',
        data: localArticle
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing article
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateArticle = async (req, res, next) => {
  try {
    const { title, category, summary, content, readTime, author, keyTakeaways, dangerLevel } = req.body;

    if (getMongoStatus()) {
      const updated = await Article.findByIdAndUpdate(
        req.params.id,
        {
          title,
          category,
          summary,
          content,
          readTime,
          author,
          keyTakeaways,
          dangerLevel,
          updatedAt: Date.now()
        },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }

      return res.json({
        success: true,
        message: 'Article updated successfully',
        data: updated
      });
    } else {
      const db = getLocalDb();
      const idx = (db.articles || []).findIndex((a) => a._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }

      const existing = db.articles[idx];
      db.articles[idx] = {
        ...existing,
        title: title || existing.title,
        category: category || existing.category,
        summary: summary || existing.summary,
        content: content || existing.content,
        readTime: readTime || existing.readTime,
        author: author || existing.author,
        keyTakeaways: keyTakeaways || existing.keyTakeaways,
        dangerLevel: dangerLevel || existing.dangerLevel,
        updatedAt: new Date().toISOString()
      };

      saveLocalDb(db);
      return res.json({
        success: true,
        message: 'Article updated successfully',
        data: db.articles[idx]
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const deleteArticle = async (req, res, next) => {
  try {
    if (getMongoStatus()) {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }
      return res.json({ success: true, message: 'Article deleted successfully' });
    } else {
      const db = getLocalDb();
      const initialLen = (db.articles || []).length;
      db.articles = (db.articles || []).filter((a) => a._id !== req.params.id);
      if (db.articles.length === initialLen) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }
      saveLocalDb(db);
      return res.json({ success: true, message: 'Article deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
