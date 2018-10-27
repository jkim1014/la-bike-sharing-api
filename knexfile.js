const config = require('./config') 

module.exports = {
  development: {
    client: 'pg',
    connection: config.databaseUrl,
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds/dev'
    },
    useNullAsDefault: true
  }
}