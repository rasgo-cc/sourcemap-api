const env = process.env;
const Package = require("./package");

if (process.argv.indexOf("--production") > -1) {
  env.NODE_ENV = "production";
} else {
  env.NODE_ENV = env.NODE_ENV ? env.NODE_ENV : "development";
}

require("dotenv").config();

const target = env.NODE_ENV;

exports = module.exports = {
  target: target,
  logger: {
    level: env.LOG_LEVEL || "debug",
    prettyPrint:
      // pino-pretty must be installed (npm i -g pino-pretty)
      target == "development"
        ? {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname"
          }
        : false
  },
  auth: {
    simple: {
      user: env.AUTH_SIMPLE_USER || "admin",
      password: env.AUTH_SIMPLE_PASSWORD || "admin"
    }
  },
  http: {
    host: env.HTTP_HOST || "localhost",
    port: env.HTTP_PORT || 8080,
    cors: env.HTTP_CORS || false
  },
  api: {
    version: env.API_VERSION || Package.version,
    prefix: env.API_PREFIX || "/api",
    swagger: {
      auth: "simple",
      info: {
        title: env.API_DOCS_TITLE || Package.name
      },
      documentationPath: env.API_DOCS_PATH || "/swagger",
      grouping: "tags"
    }
  },
  db: {
    connStr: env.DB_CONNSTR,
    poolSize: env.DB_POOLSIZE || 10,
    debug: target == "development" ? env.DB_DEBUG || false : false
  }
};
