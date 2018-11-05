/* eslint-disable */
const Trip = require('../../../models/Trip')

const weekendResolver = async obj => {
  const weekendTrips = await Trip.query()
    .select()
    .count()
    .whereRaw(
      'EXTRACT(ISODOW FROM "startTime") = 6 OR EXTRACT(ISODOW FROM "startTime") = ?',
      7,
    )
    .first()
  const weekdayTrips = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(ISODOW FROM "startTime") < 6')
    .first()
  return {
    avgWeekend: weekendTrips.count / 2,
    avgWeekday: weekdayTrips.count / 5,
  }
}

const resolver = {
  Query: {
    weekend: weekendResolver,
  },
}

module.exports = resolver
