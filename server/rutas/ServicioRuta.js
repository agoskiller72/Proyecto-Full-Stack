const express = require('express')
const ServicioAlquilercontrolador = require('../controladores/ControladorServicio')
const rutas = express.Router()

rutas.get('/', ServicioAlquilercontrolador.listall)
    .post('/', ServicioAlquilercontrolador.create)
    .get('/:key/:value', ServicioAlquilercontrolador.find, ServicioAlquilercontrolador.show)
    .put('/:key/:value', ServicioAlquilercontrolador.find, ServicioAlquilercontrolador.update)
    .delete('/:key/:value', ServicioAlquilercontrolador.find, ServicioAlquilercontrolador.deleted)

module.exports = rutas
