/* eslint-disable */
const Trip = require('../../../models/Trip')

const topTenRoutesResolver = async obj => {
  const topTenSubQuery = await Trip.query()
    .select(['startStationId', 'endStationId'])
    .count('* as count')
    .groupBy(['startStationId', 'endStationId'])
    .orderByRaw('count DESC')
    .limit(10)
  return topTenSubQuery.map(query => ({
    startStationId: query.startStationId,
    endStationId: query.endStationId,
    frequency: query.count,
  }))
}

const resolver = {
  Query: {
    topTenRoutes: topTenRoutesResolver,
  },
}

module.exports = resolver
