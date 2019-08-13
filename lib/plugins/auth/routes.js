import Boom from "@hapi/boom";

const defaultHandler = (request, h) => {
  if (!request.auth.isAuthenticated) {
    return Boom.forbidden(request.auth.error.message);
  }

  // Check if user exists
  // Create user (if it doesnt)
  // Generate JWT token

  return h.response(request.auth.credentials);
};

export default async (server, _opts) => {
  server.route({
    method: "GET",
    path: "/auth/google",
    options: {
      auth: {
        strategy: "google"
      },
      handler: defaultHandler
    }
  });

  server.route({
    method: "GET",
    path: "/auth/facebook",
    options: {
      auth: {
        strategy: "facebook"
      },
      handler: defaultHandler
    }
  });
};
