const { createTableIfNotExists } = require('../helpers')

exports.up = async knex =>
  createTableIfNotExists(knex, 'trips', table => {
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

    table.dateTime('startTime').notNullable()

    table.dateTime('endTime').notNullable()

    table.boolean('isOneWay').notNullable()

    table
      .integer('plan')
      .notNullable()
      .unsigned()

    table
      .integer('startStationId')
      .index()
      .unique()
      .notNullable()
      .references('stations.id')
    table
      .integer('endStationId')
      .index()
      .unique()
      .notNullable()
      .references('stations.id')

    table
      .integer('bikeId')
      .index()
      .unique()
      .notNullable()
      .references('bikes.id')
  })

exports.down = async knex => knex.schema.dropTable('users')
