const validate = require("../../helpers/validations");

const ENDPOINT_TAGS = ["api", "user"];

const routes = async (server, _opts) => {
  server.route({
    method: "GET",
    path: "/user",
    config: {
      tags: ENDPOINT_TAGS,
      auth: {
        strategy: "basic"
      },
      handler: (request, h) => {
        return h.response("user");
      }
    }
  });

  server.route({
    method: "GET",
    path: "/user/activate",
    config: {
      tags: ENDPOINT_TAGS,
      validate: {
        query: {
          token: validate.token()
        }
      },
      handler: (request, h) => {
        return h.response();
      }
    }
  });
};

exports = module.exports = routes;
