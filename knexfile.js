// Update with your config settings.

const config = require("./config");

module.exports = {
  client: "pg",
  connection: process.env.DB_CONNSTR,
  // connection: {
  //   port: 5432,
  //   host: process.env.POSTGRES_HOST,
  //   database: process.env.POSTGRES_DB,
  //   user: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD
  // },
  pool: {
    min: 2,
    max: config.db.poolSize
  },
  migrations: {
    directory: "./db/migrations"
  },
  debug: config.db.debug
};
