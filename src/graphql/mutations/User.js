const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const config = require('../../../config')

const registerUser = async (obj, input) => {
  const { email, password } = input
  if (validator.isEmail(email)) {
    const prev = await User.query().where('email', email)
    if (prev.length === 0) {
      const hash = bcrypt.hashSync(password, config.saltRounds)
      const user = await User.query().insertAndFetch({
        email,
        password: hash,
      })

      const payload = { id: user.id }
      const token = jwt.sign(payload, config.tokenSecret)

      return {
        user,
        token,
      }
    }
    return {
      error: 'Email already in use!',
    }
  }
  return {
    error: 'Invalid email!',
  }
}

const resolver = {
  Mutation: {
    registerUser,
  },
}
module.exports = resolver
