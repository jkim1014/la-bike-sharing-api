const { Model } = require('objection')

class Station extends Model {
  static get tableName() {
    return 'stations'
  }
  static get idColumn() {
    return 'id'
  }
}

module.exports = Station
