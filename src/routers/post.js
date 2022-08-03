const express = require('express');
const Category = require('../models/Category')
const Post = require('../models/Post')
const router = new express.Router()

router.get('/post', async (req, res) => {
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        const post = await Post.find({}).populate({
            path: 'categories',
            options: {
                sort
            },
            select: '-posts'
        })
        res.send(post)
    } catch (error) {
        res.send(error)
    }
})
router.post('/post', async (req, res) => {
    const post = new Post({
        ...req.body
    })
    try {
        await post.save()
        res.status(201).send(post)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/post/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.findOne({_id})
        if(!post){
            res.status(404).send({
                succes: false,
                error: true,
                warning: false,
                message: "Categoría no encontrada"
            })
        }
        res.send(post)
    } catch (error) {
        res.status(500).send()
    }
})
router.delete('/post/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.findByIdAndDelete(_id)
        if(!post){
            return res.status(404).send()
        }
        res.send(post)
    } catch (error) {
        res.status(500).send()
    }
})

router.put('/post/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'categories']
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
        const post = await Post.findOne({_id: req.params.id})
        if(!post){
            return res.status(404).send()
        }
        updates.forEach((update) => post[update] = req.body[update])
        await post.save()
        res.send(post)
    } catch (error) {
        res.status(400).send()
    }
})
module.exports = router