const express = require('express');
const urlRoute = express.Router();
const urlController = require('../controller/url.controller');
const globalExHandler = require('../exception/global.exception.handler');
const bodyParser = require('body-parser');

urlRoute.use(express.json());
urlRoute.use(bodyParser.urlencoded({ extended: true }));

urlRoute.post('/api/v1/url', urlController.createNewURL);

urlRoute.get('/:id', urlController.accessURL);
urlRoute.post('/:id', urlController.requestURL);

urlRoute.use(globalExHandler.globalExHandler);

module.exports = urlRoute;