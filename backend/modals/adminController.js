
const adminModal = require('../modals/adminModal')
const path= require('path')
const fs = require('fs')
const adminDefault = function (req, res) {
  res.render('adminViews/default')
}

const adminHome = function (req, res) {

  let userData = [
    { uid: 1001, unm: 'Sachin', gender: 'Male' },
    { uid: 1002, unm: 'Virat', gender: 'Male' },
    { uid: 1003, unm: 'Rahul', gender: 'Male' },
    { uid: 1004, unm: 'Yuvraj', gender: 'Male' },
  ]

  let username = req.session.loginData;
  console.log(username);

  let isValid = false
  let fruits = ["Apple", "Mango", "Banana", "Grapes"]
  res.render('adminViews/home', { isValid, fruits, userData })
}

const addUser = async function (req, res) {

  if (req.method === 'POST') {

    //console.log(req.fields);

    const { unm, pwd, mailId } = (req.fields);

    const file = req.files.profilePic;
    let filePath = "";

    if (file) {
      const uploadPath = path.join(__dirname, "../public", "uploads");

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }

      const newFileName = Date.now() + "_" + file.name;
      const fullFilePath = path.join(uploadPath, newFileName);

      fs.renameSync(file.path, fullFilePath);
      filePath = "/uploads/" + newFileName;
    }

    const user = new adminModal({
      userName: req.fields.unm,
      password: req.fields.pwd,
      emailId: req.fields.mailId,
      profilePic: filePath
    })
    let newUser = await user.save();
    if (!newUser)
      res.json({ msg: "User Not Added..." })
    else
      res.json({ msg: "User Added Successfully...", newUser })
  }
}






// http://localhost:8000/admin/showUser
const showUser = async function (req, res) {

  const userData = await adminModal.find()
  res.json({ userData })
}








const editUser = async function (req, res) {
  if (req.method === 'PATCH') {

    const user = await adminModal.findByIdAndUpdate(req.params.uid, { password: req.fields.pwd, emailId: req.fields.mailId }, { new: true })
    res.json({ user, msg: 'Record Updated...' })

  }
  else {
    let id = req.params.uid
    const user = await adminModal.findById(id)
    res.json({ user, msg: null })
  }
}


const deleteUser = async function (req, res) {

  await adminModal.findByIdAndDelete(req.params.uid);
  res.json({ success: true, msg: "Record Deleted Successfully..." })

}


module.exports = { adminDefault, adminHome, addUser, showUser, editUser, deleteUser }