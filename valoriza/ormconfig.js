module.exports = {
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: (() => {
    if (process.env.NODE_ENV === "test") {
      return "valoriza_test";
    }
    return "valoriza";
  })(),
  migrations: [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  entities: [
    "./src/modules/**/entities/*.ts"
  ],
  cli: {
    "migrationsDir": "./src/shared/infra/typeorm/migrations",
    "entitiesDir": "./src/modules/**/entities/*.ts"
  }
}
