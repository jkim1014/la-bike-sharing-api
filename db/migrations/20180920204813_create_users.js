exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table
      .uuid('id')
      .notNull()
      .primary()
    table.text('email').notNull()
    table.text('password').notNull()
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNull()
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .notNull()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
