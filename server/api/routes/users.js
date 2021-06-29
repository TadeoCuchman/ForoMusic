const express = require('express')
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');
const router = express.Router()


router.get('/', (req, res) => {
    res.json({ success: true, message: 'Lista de uruarios:', usuarios })
});

router.get('/:id', (req, res) => {
    res.json({})
})

router.post('/register', (req, res) => {

    if (req.body.mail && req.body.name && req.body.password) {
        // Formato del mail
        if ( /ˆ\S+@\S+\.\S+$/.test(req.body.mail) === false) {
            return res.status(400).json({ success: false, message: 'Mail mal escrito.' })
        } 
        // Existencia del mail
        const existeUser = usuarios.find((u) => {
            req.body.mail === u.mail
        })
        if (existeUser) {
            return res.status(400).json({ success: false, message: 'Mail ya existe.'})
        }
        // Crea y agrega el usuario
        const password = req.body.password
        const newUser = {
            name: req.body.name,
            mail: req.body.mail,
            password: password
        }

        usuarios.push(newUser)

        res.json({ succes: true, newUser, usuarios })
    }
    else {
        return res.status(400).json({ success: false, message:'Faltan Datos. Requeridos: Mail, Name y Password'})
    }
});

router.post('/login', async (req, res) => {
  
    // Buscamos el usuario con el mismo mail
    const user = usuarios.find((u) => u.mail === req.body.mail);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña no válida' });
    }
  
    // Crear el token
    const token = jwt.sign({
      name: user.name,
      mail: user.mail
    }, TOKEN_SECRET);
  
    res.json({ error: null, data: 'Login exitoso', token });
  });
  
  //Listar usuarios solo puede ser consumida por alguien autorizado
  router.get('/usuarios', verifyToken, (req, res) => {
    
    // Podemos acceder a los datos del usuario que hizo la request
    // Segun el JWT que envio en los headers de la request
    console.log(req.user);
  
    res.json({ error: null, usuarios });
  });

const usuarios = [];

module.exports = router, usuarios;