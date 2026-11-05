const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an article title'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify category'],
    enum: [
      'Digital Payments',
      'Smartphone Basics',
      'Government Schemes',
      'Cyber Fraud Prevention',
      'Safety Tips'
    ]
  },
  summary: {
    type: String,
    required: [true, 'Please provide a short summary'],
    trim: true,
    maxlength: [300, 'Summary cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide the article content'],
    trim: true
  },
  readTime: {
    type: String,
    default: '4 min read'
  },
  author: {
    type: String,
    default: 'CSP Awareness Cell'
  },
  keyTakeaways: {
    type: [String],
    default: []
  },
  dangerLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

articleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Article', articleSchema);
