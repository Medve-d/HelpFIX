const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.error('Authorization header missing');
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    console.error('Token missing in authorization header');
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken || !decodedToken._id) {
      console.error('Invalid token structure');
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findOne({ _id: decodedToken._id }).select('_id role');

    if (!user) {
      console.error('User not found for the provided token');
      return res.status(401).json({ error: 'User not authorized' });
    }

    req.user = user;
    req.role = decodedToken.role;

    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;