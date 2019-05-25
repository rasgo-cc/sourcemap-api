// Update with your config settings.

const config = require("./config");

module.exports = {
  client: "pg",
  connection: config.db.connStr,
  pool: {
    min: 2,
    max: config.db.poolSize
  },
  migrations: {
    directory: "./db/migrations"
  },
  debug: config.db.debug
};
