const merge = require('lodash.merge')

const trip = require('./Trip')
const station = require('./Station')
const travel = require('./Travel')
const season = require('./Season')
const routes = require('./Routes')
const peakHours = require('./PeakHours')
const weekend = require('./Weekend')
const bike = require('./Bike')

const resolvers = [trip, station, travel, season, routes, peakHours, weekend, bike]

module.exports = merge(...resolvers)
