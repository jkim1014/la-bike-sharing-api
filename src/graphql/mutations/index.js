const merge = require('lodash.merge')

const auth = require('./Auth')
const user = require('./User')

const resolvers = [auth, user]

module.exports = merge(...resolvers)
