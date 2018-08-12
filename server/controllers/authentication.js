const passport = require('../passport');
const generateToken = require('../utils/generateToken');

exports.login = function(req, res) {
  passport.authenticate('google-token', { session: false }, function(err, user) {
    if (err) {
      return res.status(500).send({ error: 'Some error occured', status: 500, verdict: 'permission_denied' });
    }
    if (!user) {
      return res.status(401).send({ error: 'Some error occured', status: 401, verdict: 'permission_denied' });
    }
    let userWithToken = {
      email: user.email,
      token: generateToken(user)
    };

    return res.status(200).send({ user: userWithToken });
  })(req, res);
};
