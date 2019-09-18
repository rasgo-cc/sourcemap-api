const ENDPOINT_TAGS = ["api", "common"];

const routes = async (server, opts) => {
  server.route({
    method: "GET",
    path: "/ping",
    config: {
      tags: ENDPOINT_TAGS
    },
    handler: (request, _h) => {
      return {
        ping: request.query["pong"] || "pong"
      };
    }
  });
};

exports = module.exports = routes;
