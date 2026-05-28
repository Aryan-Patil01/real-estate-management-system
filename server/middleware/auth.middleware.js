const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') next();
    else res.status(403).json({ message: 'Admin access only.' });
  });
};

const verifyAgentOrAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'agent' || req.user.role === 'admin') next();
    else res.status(403).json({ message: 'Agent or Admin access only.' });
  });
};

module.exports = { verifyToken, verifyAdmin, verifyAgentOrAdmin };