const express = require('express');
const staticController = require('../controller/static.controller');

const staticRoute = express.Router();

staticRoute.get('/', staticController.accessMain);

module.exports = staticRoute;