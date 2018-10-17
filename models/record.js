const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const schema = mongoose.Schema(
  {
    votes: Number,
    message: String
  },
  {
    timestamps: true
  }
)

const Record = mongoose.model('Record', schema);

module.exports = Record;
