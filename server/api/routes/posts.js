const express = require('express')
const { verifyToken, hasRoles } = require('../middlewares/jwt-validate')
const user = require('./users')


const router = express.Router()

router.get('/', (req, res) => {

    res.json({ success: true, message: 'Feed:', Posts}).status(200)
})

router.get('/npages', (req, res) => {
    const nPages = (Posts.length) / 10
    const nRedondeado = Math.round(nPages)
    res.json({ success: true, message: 'Number of pages:', nRedondeado}).status(200)
})

router.get('/page', (req, res) => {
    const page = req.query.page;

    const firstIndex = (page - 1) * 10
    const lastIndex = firstIndex + 10
    const postPage = Posts.slice(firstIndex, lastIndex)

    res.json({ success: true, message: 'Pagina del Feed:', postPage}).status(200)
})

router.get('/category', (req, res) => {
    const category = req.query.category;

    const filtrados = []
    Posts.forEach((x) => {
        if (x.category == category)  
            filtrados.push(x)      
    })
    res.json({succes: true, message:'Elementos de misma categoria', filtrados})
})

router.post('/', verifyToken, (req, res) => {
    const existeAlbum = Posts.find((a) => {
       return req.body.album === a.album
    })
    if (existeAlbum) {
        return res.status(400).json({ success: false, message: 'Album ya existe.'})
    }
    else {
    const newPost = {
        category: req.body.category,
        link: req.body.link,
        album: req.body.album,
        band: req.body.band,
        description: req.body.description,
        firma: req.body.firma
        }
    Posts.unshift(newPost);
    res.json({success: true, newPost, Posts})
    }   
})

router.put('/:id', verifyToken, (req, res) => {
  
})

router.delete('/', verifyToken, (req, res) => {
    const category = req.query.category;
    
})

const Posts = [];

module.exports = router;