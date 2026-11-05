const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getMongoStatus, getLocalDb } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'digital_literacy_secret_key_2026';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      if (getMongoStatus()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const db = getLocalDb();
        const found = (db.users || []).find((u) => u._id === decoded.id);
        if (found) {
          const { password, ...userWithoutPass } = found;
          req.user = userWithoutPass;
        }
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User authorization failed: User no longer exists'
        });
      }

      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid or expired token'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: No authentication token provided'
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access restricted: Administrator privileges required'
    });
  }
};

module.exports = {
  protect,
  adminOnly
};
