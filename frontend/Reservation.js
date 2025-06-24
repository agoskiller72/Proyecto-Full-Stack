var mongoose = require('mongoose');

var reservationSchema = new mongoose.Schema({
  product: String,
  people: Number,
  date: Date,
  times: [String]
});

module.exports = mongoose.model('Reservation', reservationSchema);