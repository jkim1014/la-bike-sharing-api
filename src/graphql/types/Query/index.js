const merge = require('lodash.merge')

const trip = require('./Trip')
const station = require('./Station')
const travel = require('./Travel')

const resolvers = [trip, station, travel]

module.exports = merge(...resolvers)
