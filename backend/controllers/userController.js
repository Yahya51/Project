
const userDefault = function (req, res) {
  res.send("User Default Controller...")
}

const userHome = function (req, res) {
  res.send("User Home Controller")
}
module.exports = { userDefault, userHome }