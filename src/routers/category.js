const express = require('express');
const Category = require('../models/Category')
const router = new express.Router()

router.get('/category', async (req, res) => {
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        const categories = await Category.find({}).populate({
            path: 'posts',
            options: {
                sort,
                select: "-categories"
            }
        })
        //.sort(sort)
        res.send(categories)
    } catch (error) {
        res.send(error)
    }
})
router.post('/category', async (req, res) => {
    const category = new Category({
        ...req.body
    })
    try {
        await category.save()
        res.status(201).send(category)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/category/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const category = await Category.findOne({_id})
        if(!category){
            res.status(404).send({
                succes: false,
                error: true,
                warning: false,
                message: "Categoría no encontrada"
            })
        }
        res.send(category)
    } catch (error) {
        res.status(500).send()
    }
})
router.delete('/category/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const category = await Category.findByIdAndDelete(_id)
        if(!category){
            return res.status(404).send()
        }
        res.send(category)
    } catch (error) {
        res.status(500).send()
    }
})

router.put('/category/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({
            succes: false,
            error: true,
            warning: false,
            message: "Campos a actualizar inválidos"
        })
    }
    try {
        const category = await Category.findOne({_id: req.params.id})
        if(!category){
            return res.status(404).send()
        }
        updates.forEach((update) => category[update] = req.body[update])
        await category.save()
        res.send(category)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router