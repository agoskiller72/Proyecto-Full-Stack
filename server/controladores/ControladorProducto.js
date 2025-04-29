const Producto = require('../modelo/producto')

module.exports = {
    listall: async (req, res) => {
        try {
            const productos = await Producto.find()
            res.json(productos)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    create: async (req, res) => {
        try {
            const producto = new Producto(req.body)
            await producto.save()
            res.status(201).json(producto)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    find: async (req, res, next) => {
        try {
            const key = req.params.key
            const value = req.params.value
            const producto = await Producto.findOne({ [key]: value })
            if (!producto) return res.status(404).json({ message: 'Producto no encontrado' })
            req.producto = producto
            next()
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    show: (req, res) => {
        res.json(req.producto)
    },
    update: async (req, res) => {
        Object.assign(req.producto, req.body)
        await req.producto.save()
        res.json(req.producto)
    },
    deleted: async (req, res) => {
        await req.producto.deleteOne()
        res.json({ message: 'Producto eliminado' })
    }
}
