const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema({
    nombre: { 
        type: String, required: true 
    },
    descripcion: { 
        type: String 
    },
    tipo: { 
        type: String, 
        enum: ['JetSky', 'Cuatriciclo', 'Equipo de buceo', 'Tabla de surf niño', 'Tabla de surf adulto'],
        required: true
    },
    precioPorTurno: { 
        type: Number, required: true 
    },
    requiereCasco: { 
        type: Boolean, default: false 
    },
    requiereChaleco: {
         type: Boolean, default: false 
        }
})

module.exports = mongoose.model('Producto', ProductoSchema)
