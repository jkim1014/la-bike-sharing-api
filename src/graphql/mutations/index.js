const merge = require('lodash.merge')
const parse = require('./Parse')

const resolvers = [parse]

module.exports = merge(...resolvers)
