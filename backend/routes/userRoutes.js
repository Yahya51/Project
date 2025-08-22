
const express = require('express')

const router = express.Router()

//localhost:8000/user/
// router.get('/', (req, res) => {
//   res.send("User Default Page")
// })

const { userDefault, userHome } = require('../controllers/userController')
router.get('/', userDefault)


//localhost:8000/user/home
// router.get('/home', (req, res) => {
//   res.send("User Home Page")
// })
router.get('/home', userHome)

module.exports = router
