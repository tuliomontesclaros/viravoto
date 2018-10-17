const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const Record = mongoose.model('Record', {
  votes: Number,
  message: String
});

module.exports = Record;
