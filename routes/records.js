var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Record = require('../models/record');
var Total = require('../models/total');

router.get('/resume', function(req, res, next) {
  Promise.all([
    Record.find().sort('-createdAt').limit(10),
    Total.findOne({})
  ])
    .then(([records, total]) => res.send({records, total: total.votes}))
    .catch(() => createError(500));
});

router.post('/', function(req, res, next) {
  Promise.all([
    new Record(req.body).save(),
    Total.findOneAndUpdate({}, {$inc: {votes: req.body.votes}}, {upsert: true})
  ])
    .then(([record]) => res.send(record))
    .catch(() => createError(500));
});

module.exports = router;
