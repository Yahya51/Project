const express = require('express')
const cors = require('cors')
const formidable = require('express-formidable')
const db = require('./dbConn')
const adminModal = require('./modals/adminModal')
const session = require('express-session')

const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const { verifyToken, SECRET_KEY } = require('./middlewares/auth')
const app = express()
const HOST = 'localhost'
const PORT = process.env.PORT || 8000
app.use(cors())

app.use(formidable())
app.set("view engine", "ejs")
app.use(express.static('./public'))

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60, secure: false }
}))

// Import Routes of User
const userRoutes = require('./routes/userRoutes')
// localhost:8000/user
app.use('/user', userRoutes)

// Import Routes of Admin
const adminRoutes = require('./routes/adminRoutes')
// localhost:8000/admin
// app.use('/admin', IsUserValid, hasRole('admin'), adminRoutes)
app.use('/admin', verifyToken, adminRoutes)

app.get('/login', (req, res) => {
  res.render('login', { msg: null })
})

app.post('/login', async (req, res) => {
  console.log(req.fields);

  const user = await adminModal.findOne({ emailId: req.fields.mailId })
  console.log(user);

  if (user) {
    if (user) {
      if (user && (user.password === req.fields.pwd)) {

        const token = jwt.sign(
          { id: user._id, email: user.emailId },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.json({ success: true, message: "", user, token })
      }
    }
    else {
      res.json({ success: false, message: "Invalid User ID" })
    }
  }
})

app.get('/logout', (req, res) => {

  req.session.destroy((err) => {
    res.clearCookie('connect.sid')
    res.redirect('/login')
  })
})




// localhost:8000
app.get('/', (req, res) => {
  // res.send("My First Express App......")
  let name = 'Sachin'
  let age = 45
  let msg = '<h2 align="center"> Hello World </h2> '
  res.render('defaultPage', { name, age, msg })
})

// localhost:8000/home
app.get('/home', (req, res) => {
  res.send("Welcome to Home Page")
})

app.post('/formData', (req, res) => {
  res.send("Form Data Submitted....")
})







app.listen(PORT, HOST, (err) => {
  if (err)
    console.log(err);
  else
    console.log(`Server Running at http://${HOST}:${PORT}`);
})


