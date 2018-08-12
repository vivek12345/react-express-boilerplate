const generateToken = require('../generateToken');
const jwt = require('jsonwebtoken');
const constants = require('../../constants');

describe('generateToken', () => {
  test('generateToken function should be defined', () => {
    expect(generateToken).toBeDefined();
  });
  test('generateToken function should return a jwt token for a particular user with a email id', () => {
    const user = {
      email: 'testuser@gmail.com'
    };
    const token = generateToken(user);
    expect(token).not.toBeNull();
  });
  test('generateToken should not throw an error on decryption of the right email id', done => {
    const user = {
      email: 'testuser@gmail.com'
    };
    const token = generateToken(user);
    jwt.verify(token, constants.JWT_SECRET, function(err) {
      expect(err).toBeNull();
      done();
    });
  });
  test('generateToken should decrypt to the right email id', done => {
    const user = {
      email: 'testuser@gmail.com'
    };
    const token = generateToken(user);
    jwt.verify(token, constants.JWT_SECRET, function(err, decoded) {
      expect(decoded.sub).toBe(user.email);
      done();
    });
  });
});
