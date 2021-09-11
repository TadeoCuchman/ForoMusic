const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 5000
const usuarios = require("./api/routes/users")
const feed = require("./api/routes/posts")
const comment = require("./api/routes/comments")

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/users', usuarios)
app.use('/feed', feed)
app.use('/comments', comment)

app.use('*', (req, res) => {
    res.send('ketapaasaaandaaaaa')
})

app.listen(PORT, (req, res) => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})


module.exports = app