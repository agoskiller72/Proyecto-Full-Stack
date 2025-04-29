const express = require("express")
const productocontrolador = require("../controladores/ControladorProducto")
const rutas = express.Router()

rutas.get("/", productocontrolador.listall)
    .post("/", productocontrolador.create)
    .get("/:key/:value", productocontrolador.find, productocontrolador.show)
    .put("/:key/:value", productocontrolador.find, productocontrolador.update)
    .delete("/:key/:value", productocontrolador.find, productocontrolador.deleted)

module.exports = rutas
