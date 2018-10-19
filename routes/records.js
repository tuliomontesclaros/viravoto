var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Record = require('../models/record');

router.post('/', (req, res, next) => {
  new Record(req.body).save()
    .then((record) => res.send({record}))
    .catch(() => createError(500));
});

router.post('/group', (req, res, next) => {
  Record.insertMany(req.body)
    .then((records) => res.send(records))
    .catch((error) => {console.error(error); createError(500)});
});

module.exports = router;
