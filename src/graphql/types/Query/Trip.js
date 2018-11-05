/* eslint-disable */
const Trip = require('../../../models/Trip')

const tripResolver = async (obj, { id }) =>
  Trip.query()
    .where('id', id)
    .first()

const regularResolver = async obj => {
  const monthly = await Trip.query()
    .select('plan')
    .where('plan', 30)
  const yearly = await Trip.query()
    .select('plan')
    .where('plan', 365)
  const total = await Trip.query()
    .select()
    .count('*')
    .first()
  return ((monthly.length + yearly.length) / total.count) * 100
}

const breakdownResolver = async (obj, { input }) => {
  const total = await Trip.query()
    .select()
    .count('*')
    .first()
  let plan
  if (input.tripType) {
    plan = await Trip.query()
      .select()
      .where('plan', input.planDuration)
      .andWhere('tripType', input.tripType)
  } else {
    plan = await Trip.query()
      .select()
      .where('plan', input.planDuration)
  }
  return { percentage: (plan.length / parseInt(total.count)) * 100 }
}

const resolver = {
  Query: {
    trip: tripResolver,
    regular: regularResolver,
    breakDown: breakdownResolver,
  },
}

module.exports = resolver
