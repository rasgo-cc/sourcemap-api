const Hapi = require("@hapi/hapi");
const config = require("./config");
const logger = require("pino")(config.logger);
const db = require("./db");

const pluginApiRoutesOpts = {
  prefix: config.api.prefix
};

const hapiPlugins = [
  { plugin: require("@hapi/inert") },
  { plugin: require("@hapi/vision") },
  { plugin: require("@hapi/basic") },
  { plugin: require("hapi-pino"), options: { instance: logger } },
  { plugin: require("./lib/plugins/auth"), routes: pluginApiRoutesOpts },
  { plugin: require("./lib/plugins/common"), routes: pluginApiRoutesOpts },
  { plugin: require("./lib/plugins/place"), routes: pluginApiRoutesOpts }
];
if (config.target == "development") {
  hapiPlugins.push({
    plugin: require("hapi-swagger"),
    options: config.api.swagger
  });
}

const server = Hapi.server({
  host: config.http.host,
  port: config.http.port,
  routes: {
    cors: config.http.cors
  }
});

const start = async function() {
  try {
    await db.init();
    await server.register(hapiPlugins);
    await server.start();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
start();
