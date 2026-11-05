const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getMongoStatus, getLocalDb, saveLocalDb } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'digital_literacy_secret_key_2026';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, village, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email and password'
      });
    }

    const assignedRole = role === 'admin' ? 'admin' : 'user';

    if (getMongoStatus()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists'
        });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        village: village || 'Rural Community',
        phone: phone || '',
        role: assignedRole
      });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          village: user.village,
          phone: user.phone,
          token: generateToken(user._id, user.role)
        }
      });
    } else {
      // Local fallback mode
      const db = getLocalDb();
      const existing = (db.users || []).find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        _id: 'usr_' + Date.now() + Math.random().toString(36).substring(2, 6),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        village: village || 'Rural Community',
        phone: phone || '',
        role: assignedRole,
        createdAt: new Date().toISOString()
      };

      db.users.push(newUser);
      saveLocalDb(db);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          village: newUser.village,
          phone: newUser.phone,
          token: generateToken(newUser._id, newUser.role)
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    if (getMongoStatus()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          village: user.village,
          phone: user.phone,
          token: generateToken(user._id, user.role)
        }
      });
    } else {
      // Local fallback mode
      const db = getLocalDb();
      const user = (db.users || []).find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          village: user.village,
          phone: user.phone,
          token: generateToken(user._id, user.role)
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
