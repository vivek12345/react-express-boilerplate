'use strict';
const BaseRouter = require('./BaseRouter');
const router = new BaseRouter();
const path = require('path');

router.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../../build') });
});

module.exports = router;
