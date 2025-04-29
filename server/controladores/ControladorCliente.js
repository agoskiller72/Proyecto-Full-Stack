const Cliente = require('../modelo/cliente')

module.exports = {
    listall: async (req, res) => {
        try {
            const clientes = await Cliente.find()
            res.json(clientes)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    create: async (req, res) => {
        try {
            const cliente = new Cliente(req.body)
            await cliente.save()
            res.status(201).json(cliente)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    find: async (req, res, next) => {
        try {
            const key = req.params.key
            const value = req.params.value
            const cliente = await Cliente.findOne({ [key]: value })
            if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' })
            req.cliente = cliente
            next()
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    show: (req, res) => {
        res.json(req.cliente)
    },
    update: async (req, res) => {
        Object.assign(req.cliente, req.body)
        await req.cliente.save()
        res.json(req.cliente)
    },
    deleted: async (req, res) => {
        await req.cliente.deleteOne()
        res.json({ message: 'Cliente eliminado' })
    }
}
