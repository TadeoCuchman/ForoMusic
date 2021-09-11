const express = require('express')
const { verifyToken, hasRoles } = require('../middlewares/jwt-validate')
const user = require('./users')
const pool = require('../database/index')


const router = express.Router()

// obtiene todos los posts
router.get('/', async (req, res) => {
    
    try {
        const ALLPOSTS = await pool.query('SELECT * FROM posts')
        const array = ALLPOSTS.rows
        
        return res.json({ success: true, message: 'Every post', array }).status(200)

    } catch (err) {
        return res.json({ success: false, message:'No conection with database' + JSON.stringify(err)})
    }

})

// obtiene un post por id
router.get('/post/:id', async (req, res) => {
    try {
        const post = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id])
        const array = post.rows
        
        return res.json({ success: true, message:'Post' + req.params.id, array }).status(200)


    } catch (err) {

        return res.json({ success: false, message:'No conection with database' + JSON.stringify(err)})
    }
})

// para hacer una busqueda
router.get('/search', async (req, res) => {

    try {
        const searchTerm = `%${ req.query.search }%`
        const research = await pool.query("SELECT * FROM posts WHERE album ILIKE $1 OR band ILIKE $1", [searchTerm])
        const array = research.rows
        if (array.length > 0) {
            return res.json({ success: true, message: 'Research:', array }).status(200)
        } else { return res.json({success: false, message:'Not found ' + req.query.search, array}).status(400) }


    } catch (err) {
        return res.json({ success: false, message:'Could not find any results on datebase' + JSON.stringify(err)}).status(400)

    }
})

//numero de pagignas q significan todos los posts
router.get('/npages', async (req, res) => {
    try {
    const Posts = await pool.query('SELECT * FROM posts')
    const nPages = Posts.rowCount / 8
    const nRedondeado = Math.ceil(nPages)

    res.json({ success: true, message: 'Number of pages:', nRedondeado}).status(200)

    } catch (error){
        res.json({ success: false, message: 'nPages dosent load' + JSON.stringify(error)}).status(200)
    }     
})

//carga los posts que corresponden a la pagina page de 8 posts correspondiente
router.get('/page', async (req, res) => {
    try {
        const page = req.query.page;

        const firstIndex = (page - 1) * 8
        const lastIndex = firstIndex + 8
        const Posts = await pool.query('SELECT * FROM posts ORDER BY date DESC') 
        const array = Posts.rows
        const postPage = array.slice(firstIndex, lastIndex)

        return res.json({ success: true, message: 'Pagina del Feed:', postPage}).status(200)

    } catch (err) {
        return res.json({ success: false, message: 'Database Problem' + JSON.stringify(err)}).status(400)
    }
})

//carga todas las categorias de mis posts
router.get('/allCates', async (req, res) => {
    try {
        const categorys = await pool.query('SELECT DISTINCT category FROM posts')
        const array = categorys.rows

        return res.json({ success: true, message:'All categorys', array}).status(200)

    }catch(err) {
        return res.json({ success: false, message: 'Database Problem' + JSON.stringify(err)}).status(400)
    }
})

// carga todos los posts de una categoria dada
router.get('/category', async (req, res) => {
    try {
        const category = req.query.category
        const array = await pool.query('SELECT * FROM posts WHERE category = $1 ORDER BY date DESC', [category])
        const filtrados = array.rows

    return res.json({succes: true, message:'Elements with same category', category ,filtrados}).status(200)
    
    } catch (err) {
        return res.json({ success: false, message: 'Database Problem' + JSON.stringify(err)}).status(400)
    }
})

// obtener los posts odenados por fecha del año pedido 
router.get('/Date', async (req, res) => {
    try {
        const year = req.query.year
        const date = `${year}-01-01`
        const date2 = `${year + 1}-01-01`
        const array = await pool.query('SELECT * FROM posts WHERE album_date BETWEEN $1 AND $2', [date, date+1])
        const filtrados = array.rows

        return res.json({succes: true, message:'Elements with same year', filtrados}).status(200)
    }catch (err) {
        return res.json({ success: false, message: 'Database Problem' + JSON.stringify(err)}).status(400)
    }
})

// postear un nuevo post
router.post('/', verifyToken, async (req, res) => {
    try {
        const album = req.body.album;
        const date = new Date()

        const existeAlbum =  await pool.query('SELECT * FROM posts WHERE album = $1', [album])
        
        if (existeAlbum.rowCount > 0) {

            return res.json({ success: false, message:'Album already exist', album })

        } else {
            
            await pool.query('INSERT INTO posts (category, link, album, band, description, firm, date, album_date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [req.body.category, req.body.link, req.body.album, req.body.band, req.body.description, req.user.name, date, req.body.album_date, req.user.id])
            const newPost = await pool.query('SELECT * FROM posts WHERE album = $1', [album])
            const allPost = await pool.query('SELECT * FROM posts')

            const info = [newPost.rows, allPost.rows]
            
            return res.json({ success: true, message:'Post Successfull', info })
        }

        
    } catch (error){
        return res.json({ success: false, message:'Something happens with connection with database.' + JSON.stringify(error)}).status(400)

    }

})

// obtener todos los posts de un id dados 
router.get('/MyPosts', verifyToken, async (req, res) => {
    try{
        const id = req.user.id
        const posts = await pool.query('SELECT * FROM posts WHERE user_id = $1', [id])
        const array = posts.rows

        return res.json({succes: true, message:'Posts done by' + req.user.name, array}).status(200)
    } catch (error){
        return res.json({ success: false, message: 'Database Problem' + JSON.stringify(err)}).status(400)
    }
})

// modifica un post ya existente hecho por el usuario
router.put('/:id', verifyToken, async (req, res) => {
    try {

        const changePost = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id])
        array = changePost.rows
        if (array && (req.user.id === array[0].user_id)) { 
            const post = await pool.query('UPDATE posts SET category = $1, link = $2, band = $3, description = $4, album_date= $5 WHERE id = $6', [req.body.category, req.body.link, req.body.band, req.body.description, req.body.album_date,req.params.id])   
        return res.json({ success: true, message:' Successfull update, ', post})
    } else {
        return res.json({ success: false, message:"Post couldn't be found."})
    }

    } catch (err) {
        return res.json({ success: false, message:'No connection with database' + JSON.stringify(err)}).status(400)
    }
})

//elimina un post
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const POST = await pool.query('SELECT * FROM posts WHERE posts.id = $1', [req.params.id])
        const post = POST.rows[0]
        if (req.user.id === post.user_id){
            const postToDelete = await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id])
            return res.json({ success:true, message:'Post Deleted Successfully'}).status(200)
        } else { return res.json({succes: false, message: 'Not able to delete post.'})}

} catch (err) {
    return res.json({ success: false, message: 'No connection to database' + JSON.stringify(err)})
}
    
})


module.exports = router;