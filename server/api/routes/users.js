const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');
const pool = require('../database/index')

const router = express.Router()



router.delete('/:id', async (req, res) => {

  const user = await pool.query('DELETE ')

  res.json({ success: true, message: 'Lista de uruarios:', usuarios })
});



// registrar un usuario
router.post('/register', async (req, res) => {
  try {
    if (req.body.mail && req.body.name && req.body.country && req.body.birth_date && req.body.password) {
      const user = await pool.query('SELECT * FROM users WHERE mail = $1;', [req.body.mail])
      
      if (user.rowCount > 0) {
          return res.json({success: false, message: 'Mail already exist.'}).status(400)
        }

        // Formato del mail
      if ( /^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
        return res.status(400).json({ success: false, message: 'Mail not correct.' })
      } 

      const salt = await bcrypt.genSalt(10);
      console.log('Salt', salt);
      const password = await bcrypt.hash(req.body.password, salt);

      await pool.query('INSERT INTO users (name, mail, birth_date, country, password) VALUES($1, $2, $3, $4, $5)', [req.body.name, req.body.mail, req.body.birth_date, req.body.country, password])
      
      const newUser = await pool.query('SELECT * FROM users WHERE mail = $1;', [req.body.mail])
      const array = newUser.rows

      return res.json({ succes: true, message: 'User created successfully.', array}).status(200)
      
    } else {
      return res.json({success: false, message: 'Data missing, required: Mail, Name y Password.'}).status(400)
    }
      
  } catch (err) {
    return res.json({ success: false, message: 'Error with database registering an user' + JSON.stringify(err)})
  }

});

// loguear un usuario
router.post('/login', async (req, res) => {
  
 try { const user = await pool.query('SELECT * FROM users WHERE mail = $1;', [req.body.mail])
  const array = user.rows

  if (user.rowCount <= 0) {
    return res.status(400).json({ error: 'User not found' });
  }


  // Buscamos el usuario con el mismo mail
  // const user = usuarios.find((u) => u.mail === req.body.mail);
  // if (!user) {
  //   return res.status(400).json({ error: 'Usuario not found' });
  // }
  
  const validPassword = await bcrypt.compare(req.body.password, array[0].password);
  if (!validPassword) {
    return res.status(400).json({ error: "Mail and Password donsen't match"});
  }
  
  // Crear el token 
  const token = jwt.sign({
    id: array[0].id,
    name: array[0].name,
    mail: array[0].mail
  }, TOKEN_SECRET);
  
  res.json({ error: null, data: 'SUCCESSFUL LOGIN!', token, user: array[0] }).status(200);
 
} catch (err) {
  return res.json({ success: false, message: 'Error with database login an user' + JSON.stringify(err)})
 }
});
  
  //Listar usuarios solo puede ser consumida por alguien autorizado
router.get('/allUsers', verifyToken, async (req, res) => {
  try{
    const users = await pool.query('SELECT * FROM users')
    const array = users.rows
    

    return res.json({ success: true, message: 'Every User', array}).status(200)

  } catch (err) {
    return res.json({ success: false, message: 'Error with database looking for all users' + JSON.stringify(err)})
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const user = await pool.query('SELECT * FROM users WHERE id = $1;', [req.params.id])
//     const array = user.rows
//     if (user) { res.json({success: true, message: 'User:' + array})}
//     else { res.json({success: false, message:'User not found'})}
//   } catch (err) {
//     return res.json({ success: false, message: 'Error with database looking for an user' + JSON.stringify(err)})

//   }
// })

const usuarios = [];

module.exports = router, usuarios;