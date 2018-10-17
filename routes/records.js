var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Record = require('../models/record');

router.get('/resume', function(req, res, next) {
  Promise.all([
    Record.find().sort('-createdAt').limit(10),
    Record.estimatedDocumentCount()
  ])
  .then(([records, total]) => res.send({records, total}))
  .catch(() => createError(500));
});

router.post('/', function(req, res, next) {
  new Record(req.body).save()
    .then((record) => res.send(record))
    .catch(() => createError(500));
});

module.exports = router;
