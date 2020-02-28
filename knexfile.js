const sqlite = {
  client: 'sqlite3',
  useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  }

module.exports = {
  dev: {
    ...sqlite,
    connection: { filename: './database/auth.db3' },
  },

  test: {
    ...sqlite,
    connection: { filename: './database/test.db3' }
  }
} 