/* eslint-disable */
const Trip = require('../../../models/Trip')
const _ = require('lodash')
const haversine = require('haversine')

// We assume that for roundtrip bike rides, the cyclist will move at an average speed of 6.31 mph

// We also assume that manhattan distance calculating is the most accurate representation since bikers will travel along the grid system.

const avgDistance = async (obj, input) => {
  if (input.tripType) {
    if (input.tripType === 'One Way') {
      const coordinates = await Trip.query()
        .select([
          'startLatitude',
          'startLongitude',
          'endLatitude',
          'endLongitude',
          'duration',
        ])
        .where('tripType', input.tripType)
      const distances = coordinates.map(coordinate => {
        if (coordinate.endLatitude && coordinate.startLatitude) {
          const startX = {
            latitude: coordinate.startLatitude,
            longitude: coordinate.endLongitude,
          }
          const endX = {
            latitude: coordinate.endLatitude,
            longitude: coordinate.endLongitude,
          }
          const startY = {
            latitude: coordinate.startLatitude,
            longitude: coordinate.startLongitude,
          }
          const endY = {
            latitude: coordinate.startLatitude,
            longitude: coordinate.endLongitude,
          }
          const distX = haversine(startX, endX, { unit: 'mile' })
          const distY = haversine(startY, endY, { unit: 'mile' })
          return distX + distY
          // sanitize data calculation for trips with NULL fields
        } else {
          return (coordinate.duration / 3600) * 6.31
        }
      })
      const avgDist = _.sum(distances) / distances.length
      return avgDist
    } else {
      const roundTripDurations = await Trip.query()
        .select('duration')
        .where('tripType', input.tripType)
      const distances = roundTripDurations.map(
        trip => (trip.duration / 3600) * 6.31,
      )
      const avgDist = _.sum(distances) / distances.length
      return avgDist
    }
  } else {
    const trips = await Trip.query().select([
      'duration',
      'startLatitude',
      'startLongitude',
      'endLatitude',
      'endLongitude',
      'tripType',
    ])
    const distances = trips.map(trip => {
      if (trip.tripType === 'Round Trip') {
        return (trip.duration / 3600) * 6.31
      } else {
        if (trip.endLatitude && trips.startLatitude) {
          const startX = {
            latitude: trip.startLatitude,
            longitude: trip.endLongitude,
          }
          const endX = {
            latitude: trip.endLatitude,
            longitude: trip.endLongitude,
          }
          const startY = {
            latitude: trip.startLatitude,
            longitude: trip.startLongitude,
          }
          const endY = {
            latitude: trip.startLatitude,
            longitude: trip.endLongitude,
          }
          const distX = haversine(startX, endX, { unit: 'mile' })
          const distY = haversine(startY, endY, { unit: 'mile' })
          return distX + distY
        }
      }
    })
    const avgDist = _.sum(distances) / distances.length
    return avgDist
  }
}

// return duration in minutes
const avgDuration = async (obj, input) => {
  if (
    input.planDuration == 0 ||
    input.planDuration == 30 ||
    input.planDuration == 365
  ) {
    const durations = await Trip.query()
      .select('duration')
      .where('plan', input.planDuration)
    const cleaned = durations.map(duration => duration.duration)
    return _.sum(cleaned) / (60 * durations.length)
  } else {
    const durations = await Trip.query().select('duration')
    const cleaned = durations.map(duration => duration.duration)
    return _.sum(cleaned) / (60 * durations.length)
  }
}

const resolver = {
  Query: {
    averageDistanceTravelled: avgDistance,
    averageTripDuration: avgDuration,
  },
}

module.exports = resolver
