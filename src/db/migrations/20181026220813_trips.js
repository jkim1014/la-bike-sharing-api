/* eslint-disable */
exports.up = knex => {
  return knex.schema.createTable('trips', function(table) {
    table
      .increments('primaryId')
      .notNullable()
      .unsigned()

    table
      .integer('id')
      .index()
      .unique()
      .notNullable()

    table
      .integer('duration')
      .notNullable()
      .unsigned()

    table
      .dateTime('startTime')
      .index()
      .notNullable()

    table
      .dateTime('endTime')
      .index()
      .notNullable()

    table
      .string('tripType')
      .index()
      .notNullable()

    table
      .integer('plan')
      .index()
      .unsigned()

    table.integer('startStationId').index()
    table.float('startLatitude')
    table.float('startLongitude')
    table.integer('endStationId').index()
    table.float('endLatitude')
    table.float('endLongitude')
    table.integer('bikeId').index()
  })
}

exports.down = async knex => knex.schema.dropTable('trips')
