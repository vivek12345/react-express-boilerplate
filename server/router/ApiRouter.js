'use strict';
const BaseRouter = require('./BaseRouter');
const AuthenticationController = require('../controllers/authentication');
const auth = require('../middleware/auth');
const config = require('../config.json');
const request = require('request');
const BACKEND_URL = process.env.BACKEND_SERVER;
const REQUEST_TIMEOUT = parseInt(process.env.DASHBOARD_APP_REQUEST_TIMEOUT || '50000');

const router = new BaseRouter();

router.use((req, res, next) => {
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.set('Expires', '-1');
  res.set('Pragma', 'no-cache');
  next();
});

router.post('/auth/google', AuthenticationController.login);

router.use(auth);

router.get('/products', (req, res) => {
  const url = `${BACKEND_URL}${config.products}`;
  makeRequest(url, req, res, 'GET');
});

function makeRequest(url, req, res, method) {
  let headers = null;
  if (url.indexOf('api.myjson') === -1 && url.indexOf('https://s3.ap-south-1.amazonaws.com') === -1) {
    headers = req.headers;
  }
  const options = {
    url: url,
    timeout: REQUEST_TIMEOUT,
    method: method,
    json: true,
    body: req.body,
    headers: headers
  };
  console.log(options);
  requestMaker(options, res);
}

function requestMaker(options, res) {
  request(options, (error, response, body) => {
    if (!error && response.statusCode && response.statusCode == 200) {
      return res.status(200).json((body && body.data) || {});
    } else {
      let errorObject = {
        error: response && response.body && response.body.data && response.body.data.error,
        statusCode: response && response.statusCode && response.statusCode
      };
      return res.status((response && response.statusCode) || 400).send(errorObject);
    }
  });
}

module.exports = router;
