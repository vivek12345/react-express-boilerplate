const auth = require('../auth');
const generateToken = require('../../utils/generateToken');

describe('Auth Middleware', () => {
  let request, response, next;
  beforeEach(() => {
    request = {};
    response = {
      data: null,
      statusCode: '',
      status: jest.fn(function(status) {
        this.statusCode = status;
        return this;
      }),
      send: jest.fn(function(res) {
        this.data = res;
      })
    };
    next = jest.fn();
  });
  test('next should not be called if no token provided', () => {
    auth(request, response, next);
    expect(next).toHaveBeenCalledTimes(0);
  });
  test('should return 401 status code if no token provided', () => {
    auth(request, response, next);
    expect(response.statusCode).toBe(401);
  });
  test('next should the error in right format if no token provided', function() {
    const expectedResponse = { error: 'No token found', status: 401, verdict: 'permission_denied' };
    auth(request, response, next);
    expect(response.data).toEqual(expectedResponse);
  });
  describe('bad token requests', () => {
    beforeEach(() => {
      request.headers = {};
      request.headers.authorization = 'some authorization header';
    });
    test('next should not be called if bad token was provided', function() {
      auth(request, response, next);
      expect(next).toHaveBeenCalledTimes(0);
    });
    test('next should 401 status code if bad token was provided', function() {
      request.headers = {};
      request.headers.authorization = 'some authorization header';
      auth(request, response, next);
      expect(response.statusCode).toBe(401);
    });
    test('next should the error in right format if bad token provided', function() {
      const expectedResponse = { error: 'Incorrect token found', status: 401, verdict: 'permission_denied' };
      request.headers = {};
      request.headers.authorization = 'some authorization header';
      auth(request, response, next);
      expect(response.data).toEqual(expectedResponse);
    });
  });
  describe('correct token requests', () => {
    const token = generateToken({
      email: 'testuser@gmail.com'
    });
    beforeEach(() => {
      request.headers = {};
      request.headers.authorization = `Bearer ${token}`;
    });
    test('next should be called if right token provided', function() {
      auth(request, response, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
    test('request.userEmail should be defined', function() {
      auth(request, response, next);
      expect(request.userEmail).toBeDefined();
    });
    test('request.userEmail to have our used email id', function() {
      const expectedResponse = 'testuser@gmail.com';
      auth(request, response, next);
      expect(request.userEmail).toBe(expectedResponse);
    });
  });
});
