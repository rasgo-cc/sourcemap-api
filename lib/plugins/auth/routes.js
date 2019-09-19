const methods = require("./methods");

const ENDPOINT_TAGS = ["api", "auth"];

exports = module.exports = async (server, _opts) => {
  server.route({
    method: "GET",
    path: "/auth/google",
    options: {
      tags: ENDPOINT_TAGS,
      auth: {
        strategy: "google"
      },
      handler: methods.socialDefaultHandler
    }
  });

  server.route({
    method: "GET",
    path: "/auth/facebook",
    options: {
      tags: ENDPOINT_TAGS,
      auth: {
        strategy: "facebook"
      },
      handler: methods.socialDefaultHandler
    }
  });

  server.route({
    method: "GET",
    path: "/auth/sign-out",
    options: {
      tags: ENDPOINT_TAGS,
      handler: methods.signOut
    }
  });
};
