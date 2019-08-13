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
  pino: {
    level: env.LOG_LEVEL || "debug",
    prettyPrint:
      // pino-pretty must be installed (npm i -g pino-pretty)
      target == "development"
        ? {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname,req"
          }
        : false
  },
  auth: {
    cookie_encryption_password:
      env.AUTH_COOKIE_ENCRYPTION_PASSWORD ||
      "cookie_encryption_password_secure",
    basic: {
      user: env.AUTH_SIMPLE_USER || "admin",
      password: env.AUTH_SIMPLE_PASSWORD || "admin"
    }
  },
  http: {
    secure: env.HTTPS || false,
    host: env.HTTP_HOST || "0.0.0.0",
    port: env.HTTP_PORT || 8080,
    cors: env.HTTP_CORS ? { origin: [env.HTTP_CORS] } : false
  },
  api: {
    version: env.API_VERSION || Package.version,
    prefix: env.API_PREFIX || "/api",
    swagger: {
      auth: "basic",
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
  },
  geohash: {
    precision: env.GEOHASH_PRECISION || 7
  }
};
