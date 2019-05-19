const router = module.exports = require('express').Router();

router.use('/', require('./pages').router);
