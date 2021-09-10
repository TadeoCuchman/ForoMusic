const express = require('express')
const { verifyToken, hasRoles } = require('../middlewares/jwt-validate')
const user = require('./users')
const pool = require('../database/index')

const router = express.Router()

router.get('/:id', async (req, res) => { 
    try {
        const PostComments = await pool.query('SELECT * FROM comments WHERE post_id = $1', [req.params.id])
        return res.json({ success: true, PostComments })

    }
    catch (err) {
        return res.json({ success: false, message: 'No connection to database.' + JSON.stringify(err) })
    }
})

router.post('/:id', verifyToken, async (req, res) => {
    try {
        const date = new Date()
        const newComment = await pool.query('INSERT INTO comments (comment, date, user_id, post_id) VALUES ($1, $2, $3, $4)', [req.body.comment, date, req.user.id, req.params.id ])
    } catch (e) {
        return res.json({ success: false, message:'Something happens with connection with database.' + JSON.stringify(error)}).status(400)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const comment = await pool.query('SELECT * FROM comments WHERE id = $1', [req.params.id])
        if (comment) { 
            const commentUpdated = await pool.query('UPDATE comments SET comment = $1', [req.body.comment])
            return res.json({ success: true, message:' Successfull update, ', post})
        }
        return res.json({ success: false, message:"Comment couldn't be found"})
    } catch (err) {
        return res.json({ success: false, message: 'No connection with database for comment' + JSON.stringify(err)})
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.id === req.body.user_id) {
            const comment = await pool.query('SELECT * FROM comments WHERE user_id = $1, id = $2', [req.user.id, req.body.id])
            if (comment){
                await pool.query('DELETE FROM comments WHERE id = $1', [req.body.id])
            }
        }
    } catch (err) {
        return res.json({ success: false, message:'Something happens with connection with database.' + JSON.stringify(err)}).status(400)
    }
})


module.exports = router;