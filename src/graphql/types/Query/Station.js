const Station = require('../../../models/Station')

const stationResolver = async (obj, { id }) =>
  Station.query()
    .where('id', id)
    .first()

const resolver = {
  Query: {
    station: stationResolver,
  },
}

module.exports = resolver
