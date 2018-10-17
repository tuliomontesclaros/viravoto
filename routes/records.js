var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Record = require('../models/record');

router.get('/', function(req, res, next) {
  Record.find()
    .then((records) => res.send(records))
    .catch(() => createError(500));
});

router.post('/', function(req, res, next) {
  new Record(req.body).save()
    .then((record) => res.send(record))
    .catch(() => createError(500));
});

module.exports = router;
