const mongoose = require('mongoose')

const AlquilerServicioSchema = new mongoose.Schema({
    cliente: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true 
    },
    productos: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true 
        }],
    fechaTurno: { 
        type: Date, required: true 
    },
    cantidadTurnos: {
         type: Number, required: true, min: 1, max: 3 
        },
    formaDePago: {
         type: String, enum: ['efectivo', 'moneda extranjera'], required: true 
        },
    pagado: {
         type: Boolean, default: false 
        },
    precioTotal: {
         type: Number, required: true 
        },
    descuentoAplicado: {
         type: Boolean, default: false 
        }
})

module.exports = mongoose.model('Alquiler', AlquilerServicioSchema)
