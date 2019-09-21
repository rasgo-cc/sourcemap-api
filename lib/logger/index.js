const config = require("../../config");

console.log("TARGET", config.target);

if (config.target === "development") {
  process.env.CONSOLA_LEVEL = 5;
  exports = module.exports = require("consola");
} else {
  exports = module.exports = require("pino")(config.pino);
}
