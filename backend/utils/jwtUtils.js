const jwt = require('jsonwebtoken');

// Function to generate JWT token
function generateToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
    RoleType: user.RoleType
    // Add other relevant user data as needed
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed
}

// Function to verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
