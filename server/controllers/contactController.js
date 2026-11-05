const Contact = require('../models/Contact');
const { getMongoStatus, getLocalDb, saveLocalDb } = require('../config/db');

// @desc    Submit a contact inquiry or assistance request
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, village, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, email, subject and message'
      });
    }

    const contactData = {
      name,
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : '',
      village: village ? village.trim() : 'Rural Community',
      subject: subject.trim(),
      message: message.trim(),
      status: 'New',
      createdAt: new Date()
    };

    if (getMongoStatus()) {
      const created = await Contact.create(contactData);
      return res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully! Our awareness cell will reach out to you shortly.',
        data: created
      });
    } else {
      const db = getLocalDb();
      const localContact = {
        _id: 'cnt_' + Date.now() + Math.random().toString(36).substring(2, 6),
        ...contactData,
        createdAt: new Date().toISOString()
      };
      db.contacts = db.contacts || [];
      db.contacts.unshift(localContact);
      saveLocalDb(db);

      return res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully! Our awareness cell will reach out to you shortly.',
        data: localContact
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Private/Admin
const getAllContacts = async (req, res, next) => {
  try {
    if (getMongoStatus()) {
      const contacts = await Contact.find({}).sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: contacts.length,
        data: contacts
      });
    } else {
      const db = getLocalDb();
      const list = db.contacts || [];
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

// @desc    Update contact inquiry status
// @route   PATCH /api/contacts/:id/status
// @access  Private/Admin
const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'In Review', 'Resolved'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    if (getMongoStatus()) {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
      }
      return res.json({ success: true, message: 'Status updated', data: contact });
    } else {
      const db = getLocalDb();
      const idx = (db.contacts || []).findIndex((c) => c._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
      }
      db.contacts[idx].status = status;
      saveLocalDb(db);
      return res.json({ success: true, message: 'Status updated', data: db.contacts[idx] });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = async (req, res, next) => {
  try {
    if (getMongoStatus()) {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
      }
      return res.json({ success: true, message: 'Contact inquiry deleted successfully' });
    } else {
      const db = getLocalDb();
      const initialLen = (db.contacts || []).length;
      db.contacts = (db.contacts || []).filter((c) => c._id !== req.params.id);
      if (db.contacts.length === initialLen) {
        return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
      }
      saveLocalDb(db);
      return res.json({ success: true, message: 'Contact inquiry deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
};
