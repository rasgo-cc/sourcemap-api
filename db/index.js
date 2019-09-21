require("dotenv").config();
const consola = require("consola");
const chalk = require("chalk");
const knexConfig = require("../knexfile");
const config = require("../config");

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const knex = require("knex")(knexConfig);
const redis = require("async-redis").createClient(process.env.REDIS_URL);

const db = {
  knex: knex,
  redis: redis,
  async init() {
    if (config.target === "production") {
      await sleep(3000);
    }
    let connectionOk = false;
    let retries = 10;
    consola.info("connecting to database");
    while (!connectionOk && --retries) {
      try {
        const data = await knex.raw("SELECT VERSION()");
        consola.success(data.rows[0].version);
        connectionOk = true;
      } catch (e) {
        consola.error(e.message);
        await sleep(2000);
      }
    }

    if (!connectionOk) {
      consola.error("couldn't establish connection to database");
    }

    consola.success(`Redis: ${redis.server_info.redis_version}`);
  },
  async quit() {
    await knex.destroy();
    await redis.quit();
  }
};

if (config.target === "development") {
  knex.on("query", function(queryData) {
    let builtSql = queryData.sql;
    queryData.bindings.forEach(binding => {
      const bindingAsInt = parseInt(binding, 10);
      if (!bindingAsInt) {
        binding = "'" + binding + "'";
      }
      builtSql = builtSql.replace("?", binding);
    });
    console.debug(chalk.bgCyan.black(" SQL "), chalk.cyan(builtSql));
  });
}

exports = module.exports = db;
