const routes = async (server, opts) => {
  server.route({
    method: "GET",
    path: "/ping",
    config: {
      tags: ["api", "common"],
      handler: (request, _h) => {
        return {
          ping: request.query["pong"] || "pong"
        };
      }
    }
  });
};

exports = module.exports = routes;
