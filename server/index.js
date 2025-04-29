const express = require("express")
const mongoose = require("mongoose")
const app = express()

const clienteRutas = require('./rutas/ClienteRuta')
const productoRutas = require('./rutas/ProductoRuta')
const alquilerRutas = require('./rutas/ServicioRuta')

app.use(express.json())

mongoose.connect("mongodb+srv://agoskiller:admin1234@cluster0.lflbben.mongodb.net/crud")

app.use('/api/clientes', clienteRutas)
app.use('/api/productos', productoRutas)
app.use('/api/alquileres', alquilerRutas)

app.listen("3001", ()=>{
    console.log("Server funcionanding")
})