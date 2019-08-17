// const mongoose = require("mongoose");
const logger = require("../logger");
const knexConfig = require("../knexfile");

const knex = require("knex")(knexConfig);
const redis = require("async-redis").createClient(process.env.REDIS_URL);

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const db = {
  async init() {
    let connectionOk = false;
    let retries = 10;
    logger.info("connecting to database");
    while (!connectionOk && --retries) {
      try {
        const data = await knex.raw("SELECT VERSION()");
        logger.info(data.rows[0].version);
        connectionOk = true;
      } catch (e) {
        logger.error(e.message);
        await sleep(2000);
      }
    }

    if (!connectionOk) {
      logger.error("couldn't establish connection to database");
    }
  },
  knex: knex,
  redis: redis
};

exports = module.exports = db;
