import {Router} from 'express'
import {loginHandler, registerHandler, profileHandler} from '../controllers/auth_controller'
import {requireAuth} from '../middlewares/require_auth'

const router = Router()

// router.post('/login',(req, res)=>{
//     res.send('Login route')
// })

// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body

//     console.log('username from Router: ', username)

//     // lógica de autenticación aquí
//     res.json({ success: true })
//   } catch (err) {
//     res.status(500).json({ error: 'Error en login' })
//   }
// })

router.post('/login', loginHandler)
router.post("/register", registerHandler)
router.get('/profile', requireAuth, profileHandler)

export default router