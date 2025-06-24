var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var Reservation = require('./models/Reservation');


mongoose.set('strictQuery', false);

var app = express();

app.use(cors());
app.use(express.json());

app.post('/reservations', function(req, res) {
  var reservations = req.body.reservations;
  if (!reservations || reservations.length == 0) {
    res.status(400).json({ message: "No hay reservas para guardar." });
    return;
  }

  var newReservations = reservations.map(function(r) {
    return new Reservation({
      product: r.product,
      people: r.people,
      date: r.date,
      times: r.times
    });
  });






  
  Reservation.insertMany(newReservations, function(err, savedReservations) {
    if (err) {
      console.log("Error al guardar:", err);
      res.status(500).json({ message: "Error al guardar la reserva.", error: err.message });
    } else {
      console.log("Reservas guardadas:", savedReservations);
      var reservationIds = savedReservations.map(function(r) { return r._id.toString(); });
      res.status(201).json({ 
        message: "Reservas guardadas.", 
        reservationIds: reservationIds,
        reservations: savedReservations.map(r => ({
          _id: r._id.toString(),
          product: r.product,
          people: r.people,
          date: r.date,
          times: r.times
        }))
      });
    }
  });
});









app.delete('/reservations/:id', function(req, res) {
  var id = req.params.id;
  Reservation.deleteOne({ _id: id }, function(err) {
    if (err) {
      console.log("Error al eliminar:", err);
      res.status(500).json({ message: "Error al eliminar la reserva.", error: err.message });
    } else {
      res.status(200).json({ message: "Reserva eliminada." });
    }
  });
});









mongoose.connect('mongodb+srv://agos151103:1234@cluster0.arwicz5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    console.log("Error conectando a MongoDB:", err);
  } else {
    console.log("Conectado a MongoDB");
    app.listen(3000, function() {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  }
});