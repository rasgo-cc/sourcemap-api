const Hapi = require("@hapi/hapi");
const config = require("./config");
const logger = require("./lib/logger");
const db = require("./db");

const pluginApiRoutesOpts = {
  prefix: config.api.prefix
};

const hapiPlugins = [
  { plugin: require("@hapi/inert") },
  { plugin: require("@hapi/vision") },
  { plugin: require("@hapi/basic") },
  { plugin: require("@hapi/bell") },
  {
    plugin: require("hapi-pino"),
    options: {
      instance: require("pino")(config.pino)
    }
  },
  { plugin: require("./lib/plugins/auth"), routes: pluginApiRoutesOpts },
  { plugin: require("./lib/plugins/common"), routes: pluginApiRoutesOpts },
  { plugin: require("./lib/plugins/place"), routes: pluginApiRoutesOpts }
  // { plugin: require("./lib/plugins/user"), routes: pluginApiRoutesOpts }
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
    cors: config.http.cors,
    validate: {
      failAction: async (request, h, err) => {
        if (config.target === "development") {
          logger.error(err);
          return err;
        } else {
          request.logger.error(err);
          throw Boom.badRequest(`Invalid request payload input`);
        }
      }
    }
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

process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});
