// const mongoose = require("mongoose");
const config = require("../config");
const logger = require("pino")(config.logger);
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);

const db = {
  async init() {
    const data = await knex.raw("SELECT VERSION()");
    logger.info(data.rows[0].version);
  },
  knex: knex
};

exports = module.exports = db;
