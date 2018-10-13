const User = require('../../models/user')
const config = require('../../../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async function loginUserResolver(obj, { email, password }) {
  const user = await User.query().findOne('email', email)

  if (!user) {
    return {
      error: 'Email does not exist.',
    }
  }

  if (!password) {
    return {
      error: 'Password not provided',
    }
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return {
      error: 'Invalid password.',
    }
  }

  const payload = { id: user.id }
  const token = jwt.sign(payload, config.tokenSecret)
  return {
    user,
    token,
  }
}

const resolver = {
  Mutation: { loginUser },
}

module.exports = resolver
