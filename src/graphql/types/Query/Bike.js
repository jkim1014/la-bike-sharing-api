/* eslint-disable */
const Trip = require('../../../models/Trip')

const bikeResolver = async obj => {
  const counter = {}
  const first = 49306
  const last = 53510
  const week = await Trip.query()
    .select(['startStationId', 'endStationId', 'tripType'])
    .whereBetween('primaryId', [first, last])
  week.map(day => {
    if (day.tripType === 'One Way') {
      if (counter[day.startStationId] !== undefined) {
        counter[day.startStationId] -= 1
      } else {
        counter[day.startStationId] = -1
      }
      if (counter[day.endStationId] !== undefined) {
        counter[day.endStationId] += 1
      } else {
        counter[day.endStationId] = 1
      }
    }
  })
  const sorted = Object.entries(counter)
    .sort((a, b) => a[1] - b[1])
    .map(entry => {
      return {
        station: entry[0],
        deficit: entry[1],
      }
    })
  return sorted
}

const resolver = {
  Query: {
    bike: bikeResolver,
  },
}

module.exports = resolver
