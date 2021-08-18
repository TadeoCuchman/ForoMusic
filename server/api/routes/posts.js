const express = require('express')
const { verifyToken, hasRoles } = require('../middlewares/jwt-validate')
const user = require('./users')
const pool = require('../database/index')


const router = express.Router()

router.get('/', async (req, res) => {
    
    try {
        const ALLPOSTS = await pool.query('SELECT * FROM posts')
        const array = ALLPOSTS.rows
        
        return res.json({ success: true, message: 'Todos los posts desde el inicio', array }).status(200)

    } catch (err) {
        return res.json({ success: false, message:'No me la counter strike X.X'})
    }

})

router.get('/npages', async (req, res) => {
    try {
    const Posts = await pool.query('SELECT * FROM posts')
    const nPages = Posts.rowCount / 8
    const nRedondeado = Math.ceil(nPages)

    res.json({ success: true, message: 'Number of pages:', nRedondeado}).status(200)

    } catch (error){
        res.json({ success: false, message: 'nPages dosent load' + JSON.stringify(error)}).status(200)
    }    
    // const nPages = (Posts.length) / 8
    // const nRedondeado = Math.ceil(nPages)
     
})

router.get('/page', async (req, res) => {
    try {
        const page = req.query.page;

        const firstIndex = (page - 1) * 8
        const lastIndex = firstIndex + 8
        const Posts = await pool.query('SELECT * FROM posts ORDER BY date') 
        const array = Posts.rows
        const postPage = array.slice(firstIndex, lastIndex)

        return res.json({ success: true, message: 'Pagina del Feed:', postPage}).status(200)

    } catch (err) {
        return res.json({ success: false, message: 'Database Problem' + JSON.stringify(err)}).status(400)
    }
})

router.get('/allCates', async (req, res) => {
    try {
        const categorys = await pool.query('SELECT DISTINCT category FROM posts')
        const array = categorys.rows

        return res.json({ success: true, message:'All categorys', array}).status(200)

    }catch(err) {
        return res.json({ success: false, message: 'Database Problem' + JSON.stringify(err)}).status(400)
    }
})

router.get('/category', async (req, res) => {
    try {
        const category = req.query  .category
        const array = await pool.query('SELECT * FROM posts WHERE category = $1', [category])
        const filtrados = array.rows

    return res.json({succes: true, message:'Elementos de misma categoria', category ,filtrados}).status(200)
    
    } catch (err) {
        return res.json({ success: false, message: 'Database Problem' + JSON.stringify(err)}).status(400)
    }
})

router.post('/', verifyToken, async (req, res) => {
    try {
        const album = req.body.album;
        const date = new Date()

        const existeAlbum =  await pool.query('SELECT * FROM posts WHERE album = $1', [album])
        
        if (existeAlbum.rowCount > 0) {

            return res.json({ success: false, message:'Album already exist', album })

        } else {
            
            await pool.query('INSERT INTO posts (category, link, album, band, description, firm, date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.category, req.body.link, req.body.album, req.body.band, req.body.description, req.user.name, date, req.user.id])
            const newPost = await pool.query('SELECT * FROM posts WHERE album = $1', [album])
            const allPost = await pool.query('SELECT * FROM posts')

            const info = [newPost.rows, allPost.rows]
            
            return res.json({ success: true, message:'Post Successfull', info})
        }

        
    } catch (error){
        return res.json({ success: false, message:'Something happens with connection with database.' + JSON.stringify(error)}).status(400)

    }

})

router.put('/:id', verifyToken, async (req, res) => {
    try {const changePost = await pool.query('SELECT * FROM posts WHERE id = $1', [req.body.id])
    if (changePost) { 
        const post = await pool.query('UPDATE posts SET category = $1, link = $2, band = $3, description = $4 WHERE id = $5', [req.body.category, req.body.link, req.body.band, req.body.description, req.body.id])
        
        return res.json({ success: true, message:' Successfull update, ', post})
    } else {
        return res.json({ success: false, message:"Post couldn't be found."})
    }
    // const postPut = Posts.find((a) => {
    //     if (req.body.album === a.album){
            
    //     }
    // })

    } catch (err) {
        return res.json({ success: false, message:'No connection with database' + JSON.stringify(error)}).status(400)
    }
})

router.delete('/', verifyToken, async (req, res) => {
    try {
        const postToDelete = await pool.query('DELETE FROM posts WHERE id = $1', [req.body.id])


    return res.json({ success:true, message: 'Post Deleted Successfuly', postToDelete})

} catch (err) {
    return res.json({ success: false, message: 'No connection to database' + JSON.stringify(err)})
}
    
})

// const Posts = [{id:0}];

module.exports = router;