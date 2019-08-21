const Boom = require("@hapi/boom");
const logger = require("@/lib/logger");
const Place = require("../place");
const validate = require("../../helpers/validations");
const ENDPOINT_TAGS = ["api", "common"];

const routes = async (server, opts) => {
  server.route({
    method: "GET",
    path: "/ping",
    config: {
      tags: ENDPOINT_TAGS,
      auth: "jwt"
    },
    handler: (request, _h) => {
      console.log("PING AUTH", request.auth);
      return {
        ping: request.query["pong"] || "pong"
      };
    }
  });
};

exports = module.exports = routes;
