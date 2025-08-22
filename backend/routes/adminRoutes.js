const express = require('express')
const router = express.Router()
const { adminDefault, adminHome, addUser, showUser, editUser, deleteUser } = require('../controllers/adminController')

// localhost:8000/admin
router.get('/', adminDefault)

// localhost:8000/admin/home
router.get('/home', adminHome)

// localhost:8000/admin/addUser
router.get('/addUser', addUser)


// http://localhost:8000/admin/addUser
router.post('/addUser', addUser)



router.get('/showUser', showUser)

// For Edit user data
router.get('/editUser/:uid', editUser)
router.patch('/editUser/:uid', editUser)

router.delete('/deleteUser/:uid', deleteUser)


module.exports = router