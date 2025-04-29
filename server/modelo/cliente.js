const mongoose = require("mongoose")

const ClienteSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    telefono: {
        type: String
    },
    monedaPreferida: {
        type: String,
        enum: ["local", "Extranjera"], required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Cliente", ClienteSchema)