const { createTableIfNotExists } = require('../helpers')

exports.up = async knex =>
  createTableIfNotExists(knex, 'bikes', table => {
    table
      .increments('primaryId')
      .notNullable()
      .unsigned()

    table
      .integer('id')
      .index()
      .unique()
      .notNullable()
  })

exports.down = async knex => knex.schema.dropTable('bikes')
