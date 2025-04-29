const Alquiler = require('../modelo/AlquilerServicio')

module.exports = {
    listall: async (req, res) => {
        try {
            const alquileres = await Alquiler.find()
                .populate('cliente')
                .populate('productos')
            res.json(alquileres)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    create: async (req, res) => {
        try {
            const alquiler = new Alquiler(req.body)
            await alquiler.save()
            res.status(201).json(alquiler)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    find: async (req, res, next) => {
        try {
            const key = req.params.key
            const value = req.params.value
            const alquiler = await Alquiler.findOne({ [key]: value })
                .populate('cliente')
                .populate('productos')
            if (!alquiler) return res.status(404).json({ message: 'Alquiler no encontrado' })
            req.alquiler = alquiler
            next()
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    show: (req, res) => {
        res.json(req.alquiler)
    },
    update: async (req, res) => {
        Object.assign(req.alquiler, req.body)
        await req.alquiler.save()
        res.json(req.alquiler)
    },
    deleted: async (req, res) => {
        await req.alquiler.deleteOne()
        res.json({ message: 'Alquiler eliminado' })
    }
}
