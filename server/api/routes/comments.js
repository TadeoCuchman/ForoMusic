const express = require('express')
const { verifyToken, hasRoles } = require('../middlewares/jwt-validate')
const user = require('./users')
const pool = require('../database/index')

const router = express.Router()

//busca todos los comentarios de un post
router.get('/:id', async (req, res) => { 
    try {
        const PostComments = await pool.query('SELECT comments.id, comment, name, comments.date FROM posts INNER JOIN comments ON comments.post_id = $1 AND posts.id = $1 JOIN users ON users.id = comments.user_id', [req.params.id])
        const array = PostComments.rows
       
        return res.json({ success: true, array }).status(200)

    }
    catch (err) {
        return res.json({ success: false, message: 'No connection to database.' + JSON.stringify(err) })
    }
})

//postear un commentario en un post
router.post('/:id', verifyToken, async (req, res) => {
    try {
        const date = new Date()
        const newComment = await pool.query('INSERT INTO comments (comment, date, user_id, post_id) VALUES ($1, $2, $3, $4)', [req.body.comment, date, req.user.id, req.params.id ])
        return res.json({ success: true, newComment }).status(200)
    
    } catch (e) {
        return res.json({ success: false, message:'Something happens with connection with database.' + JSON.stringify(error)}).status(400)
    }
})

//no implementado
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const comment = await pool.query('SELECT * FROM comments WHERE id = $1', [req.params.id])
        if (comment) { 
            await pool.query('UPDATE comments SET comment = $1', [req.body.comment])
            return res.json({ success: true, message:' Successfull update, ', post})
        }
        return res.json({ success: false, message:"Comment couldn't be found"})
    } catch (err) {
        return res.json({ success: false, message: 'No connection with database for comment' + JSON.stringify(err)})
    }
})

//borrar un comentario (propio)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        
        const user = await pool.query('SELECT * FROM users INNER JOIN comments ON users.id = $1 AND comments.id = $2', [req.user.id, req.params.id])
        array = user.rows
        if (array) {
            await pool.query('DELETE FROM comments WHERE id = $1', [req.params.id])
            return res.json({ success:true, message:'Comment Deleted Successfully'}).status(200)
        } else { return res.json({ success:false, message:'You can not delete this comment'}).status(400) }

    } catch (err) {
        return res.json({ success: false, message:'Something happens with connection with database.' + JSON.stringify(err)}).status(400)
    }
})


module.exports = router;