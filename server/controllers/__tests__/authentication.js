const AuthenticationController = require('../authentication');

describe('Authentication Controller', () => {
  let request, response;
  test('login function should be exported', () => {
    expect(AuthenticationController.login).toBeDefined();
  });
  describe('No or Incorrect access_token', () => {
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
    });

    test('login function should return a 401 if no access_token found for google login', () => {
      AuthenticationController.login(request, response);
      expect(response.statusCode).toBe(401);
    });
    test('login function should return a proper error response for incorrect access_token', () => {
      const expectedResponse = { error: 'Some error occured', status: 401, verdict: 'permission_denied' };
      AuthenticationController.login(request, response);
      expect(response.data).toEqual(expectedResponse);
    });
  });
});
