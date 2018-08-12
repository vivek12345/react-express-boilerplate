const jwt = require('jsonwebtoken');
const constants = require('../constants');

function auth(req, res, next) {
  let authorizationToken = req.headers && req.headers['authorization'];
  const token = authorizationToken && authorizationToken.replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'No token found', status: 401, verdict: 'permission_denied' });
  jwt.verify(token, constants.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Incorrect token found', status: 401, verdict: 'permission_denied' });
    // if everything good, save to request for use in other routes
    req.userEmail = decoded.sub;
    next();
  });
}
module.exports = auth;
