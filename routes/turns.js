var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Record = require('../models/record');
var Total = require('../models/total');

router.post('/', async (req, res, next) => {
  const {total} = await Total.findOneAndUpdate({}, {$inc: {total: 1}}, {upsert: true})
  Record.findOneRandom((err, record) => {
    if (err) return createError(500);

    res.send({record, total})
  })
});

module.exports = router;
