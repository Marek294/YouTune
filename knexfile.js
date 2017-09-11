// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'tantor.db.elephantsql.com',
      database: 'txmthimg',
      user:     'txmthimg',
      password: 'sEtHx8SoXNNgxoEzBQalQSrCxGQFjzY3',
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
