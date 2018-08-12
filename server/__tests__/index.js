const request = require('supertest');
const app = require('../index');
const generateToken = require('../utils/generateToken');

describe('basic test cases for the express setup code', () => {
  test('it should return 200 ok for / route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('tests for product page', () => {
  test('it should return 401 for an api call when no authorization token is found', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(401);
  });
  test('it should return the error in the right format for an api call when no authorization token is found', async () => {
    const expectedResponse = { error: 'No token found', status: 401, verdict: 'permission_denied' };
    const response = await request(app).get('/api/products');
    let error = null;
    try {
      error = JSON.parse(response.text);
    } catch (e) {
      error = null;
    }
    expect(error).not.toBeNull();
    expect(error).toEqual(expectedResponse);
  });
  test('it should return 401 for an api call when incorrect JWT token', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Authorization', 'Bearer 738127837128378127');
    expect(response.statusCode).toBe(401);
  });
  test('it should return the error in the right format for an api call when incorrect token is found', async () => {
    const expectedResponse = { error: 'Incorrect token found', status: 401, verdict: 'permission_denied' };
    const response = await request(app)
      .get('/api/products')
      .set('Authorization', 'Bearer 738127837128378127');
    const error = JSON.parse(response.text);
    expect(error).toEqual(expectedResponse);
  });
  test('it should return 200 for right authorization token', async () => {
    const token = generateToken({
      email: 'testuser@gmail.com'
    });
    const bearerToken = `Bearer ${token}`;
    const response = await request(app)
      .get('/api/products')
      .set('Authorization', bearerToken);

    expect(response.statusCode).toBe(200);
  });
  test('it should return 200 for right authorization token', async () => {
    const token = generateToken({
      email: 'testuser@gmail.com'
    });
    const bearerToken = `Bearer ${token}`;
    const agent = request(app);
    const response = await agent.get('/api/products').set('Authorization', bearerToken);
    let output = null;
    try {
      output = JSON.parse(response.text);
    } catch (e) {
      output = null;
    }
    expect(output).toBeDefined();
    expect(output.products).toBeDefined();
    expect(output.products.length).toBeGreaterThan(0);
  });
});
