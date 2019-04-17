const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'this_is_must_be_longer_string');
    next();
  } catch(error) {
    res.status(401).json({
      message: 'Authentication Failed!'
    });
  }
};