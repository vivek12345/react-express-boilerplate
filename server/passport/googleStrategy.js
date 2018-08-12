const GoogleTokenStrategy = require('passport-google-token').Strategy;
const constants = require('../constants');

const strategy = new GoogleTokenStrategy(
  {
    clientID: constants.GOOGLE_CLIENT_ID,
    clientSecret: constants.GOOGLE_CLIENT_SECRET
  },
  function(accessToken, refreshToken, profile, done) {
    const email = profile && profile.emails && Array.isArray(profile.emails) && profile.emails[0].value;
    let user = null;
    let err = null;
    user = {
      email: email
    };
    return done(err, user);
  }
);

module.exports = strategy;
