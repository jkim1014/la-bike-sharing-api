const { createTableIfNotExists } = require('../helpers')

exports.up = async knex =>
  createTableIfNotExists(knex, 'stations', table => {
    table
      .increments('primaryId')
      .notNullable()
      .unsigned()

    table
      .integer('id')
      .index()
      .unique()
      .notNullable()

    table.float('latitude').notNullable()
    table.float('longitude').notNullable()
  })

exports.down = async knex => knex.schema.dropTable('stations')
