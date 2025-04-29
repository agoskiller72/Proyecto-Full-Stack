const express = require("express")
const clientecontrolador = require("../controladores/ControladorCliente")
const rutas = express.Router()

rutas.get("/", clientecontrolador.listall)
    .post("/", clientecontrolador.create)
    .get("/:key/:value", clientecontrolador.find, clientecontrolador.show)
    .put("/:key/:value", clientecontrolador.find, clientecontrolador.update)
    .delete("/:key/:value", clientecontrolador.find, clientecontrolador.deleted)

module.exports = rutas
