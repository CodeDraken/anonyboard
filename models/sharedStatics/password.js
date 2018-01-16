const bcrypt = require('bcryptjs')

const hashPass = async function (doc, passKey = 'password') {
  try {
    if (doc.isModified(passKey)) {
      const hash = await bcrypt.hash(doc.password, 10)
      doc.password = hash
    }
    return
  } catch (err) {
    throw err
  }
}

const comparePassword = async function (password, doc, passKey = 'password') {
  return bcrypt.compare(password, doc[passKey])
}

module.exports = {
  hashPass,
  comparePassword
}
