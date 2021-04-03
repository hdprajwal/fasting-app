const jwt = require('jsonwebtoken');
const config = require('../config/config');

function auth(req, res, next) {
  console.log(req.params);
  const token = req.headers.authorization.split(' ')[1];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res
        .status(401)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = { auth };
