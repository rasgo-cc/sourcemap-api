const config = require("../../config");
const pino = require("pino")(config.pino);
const consola = require("consola");
exports = module.exports = config.target === "development" ? consola : pino;
