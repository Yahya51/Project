
const mongoose = require('mongoose')
const schema = new mongoose.Schema({

  userName: { type: String, required: true },
  password: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: true },
  hasRole: { type: String, enum: ["admin", "user"], default: 'user' },
  regDate: { type: Date, required: true, default: Date.now },
  profilePic: { type: String }
})

const adminModal = mongoose.model('User', schema)
module.exports = adminModal


