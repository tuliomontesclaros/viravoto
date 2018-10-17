const mongoose = require('mongoose');

const schema = mongoose.Schema({
    votes: {type: Number, default: 0},
});
const Total = mongoose.model('Total', schema);

module.exports = Total;
