const Trip = require('../../../models/Trip')

const tripResolver = async (obj, { id }) =>
  Trip.query()
    .where('id', id)
    .first()

const resolver = {
  Query: {
    trip: tripResolver,
  },
}

module.exports = resolver
