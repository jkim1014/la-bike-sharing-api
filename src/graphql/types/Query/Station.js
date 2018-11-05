/* eslint-disable */
const Trip = require('../../../models/Trip')

const popularStart = async () => {
  const topTenSubQuery = await Trip.query()
    .select('startStationId')
    .count('startStationId as count')
    .groupBy('startStationId')
    .orderByRaw('count DESC')
    .limit(10)
  const topTenStartingStations = topTenSubQuery.map(async station => {
    const start = await Trip.query().where('startStationId', station.startStationId).first()
    return {
      id: station.startStationId,
      latitude: start.startLatitude,
      longitude: start.startLongitude,
      count: station.count
    }
  })

  return topTenStartingStations
}

const popularStop = async () => {
  const topTenSubQuery = await Trip.query()
    .select('endStationId')
    .count('endStationId as count')
    .groupBy('endStationId')
    .orderByRaw('count DESC')
    .limit(10)
  const topTenEndStations = topTenSubQuery.map(async station => {
    const start = await Trip.query().where('endStationId', station.endStationId).first()
    return {
      id: station.endStationId,
      latitude: start.endLatitude,
      longitude: start.endLongitude,
      count: station.count
    }
  })

  return topTenEndStations
}

const resolver = {
  Query: {
    topTenStartStations: popularStart,
    topTenStopStations: popularStop
  },
}

module.exports = resolver
