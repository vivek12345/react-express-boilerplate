const jwt = require('jsonwebtoken');
const constants = require('../constants');

module.exports = function tokenForUser(user) {
  var time = new Date().getTime();
  return jwt.sign({ sub: user.email, iat: time, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, constants.JWT_SECRET);
};
