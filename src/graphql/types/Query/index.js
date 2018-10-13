const merge = require('lodash.merge')

const user = require('./user')

const resolvers = [user]

module.exports = merge(...resolvers)
