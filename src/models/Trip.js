const { Model } = require('objection')

class Trip extends Model {
  static get tableName() {
    return 'trips'
  }
  static get idColumn() {
    return 'id'
  }
}

module.exports = Trip
