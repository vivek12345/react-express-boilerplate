'use strict';
const express = require('express');
const Router = express.Router;

class BaseRouter extends Router {
  constructor(options) {
    super(options);
  }
}

module.exports = exports = BaseRouter;
