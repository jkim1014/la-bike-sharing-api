const User = require('../../../models/user')

const userResolver = async (obj, { id }) => User.query().findById(id)

const resolver = {
  Query: {
    user: userResolver,
  },
}

module.exports = resolver
