const mongoose = require('mongoose');
const random = require('mongoose-simple-random');
mongoose.connect(process.env.DATABASE_URL);

const schema = mongoose.Schema(
  {
    message: String
  },
  {
    timestamps: true
  }
)

schema.plugin(random);
const Record = mongoose.model('Record', schema);

module.exports = Record;
