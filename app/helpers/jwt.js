const jwt = require("jsonwebtoken");

function generateToken(token) {
  return jwt.sign(token, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

function verifyToken(payload) {
  return jwt.verify(payload, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
