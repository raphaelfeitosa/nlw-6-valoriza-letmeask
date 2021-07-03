module.exports = {
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: (() => {
    if (process.env.NODE_ENV === 'test') {
      return "valoriza_test";
    }
    return "valoriza";
  })(),
  "migrations": [
    "src/database/migrations/*.ts"
  ],
  "entities": [
    "src/entities/*.ts"
  ],
  "cli": {
    "migrationsDir": {
      "migrationsDir": "src/database/migrations",
      "entitiesDir": "src/entities"
    }
  }
}
