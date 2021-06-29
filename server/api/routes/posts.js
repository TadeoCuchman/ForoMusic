const express = require('express')


const router = express.Router()

router.get('/', (req, res) => {
    res.json({ success: true, message: 'Feed:', Posts}).status(200)
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})

router.post('/', (req, res) => {
    const existeAlbum = Posts.find((a) => {
        req.body.album === a.album
    })
    if (existeAlbum) {
        return res.status(400).json({ success: false, message: 'Album ya existe.'})
    }
    const newPost = {
        category: req.body.category,
        link: req.body.link,
        album: req.body.album,
        band: req.body.band,
        description: req.body.description
    }
    Posts.push(newPost);
    res.json({success:'true', newPost, Posts})
})

router.put('/:id', (req, res) => {
    Post.findOneAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204))
})

router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id).exec().then(() => res.sendStatus(204))
})

const Posts = [];

module.exports = router, Posts;