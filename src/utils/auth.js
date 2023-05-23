const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const AuthService = require('../utils/auth');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || '';

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const auth = new AuthService();

module.exports = { authMiddleware, auth };
