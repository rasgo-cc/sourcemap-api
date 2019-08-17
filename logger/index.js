const config = require("../config");
const logger = require("pino")(config.pino);
exports = module.exports = logger;
