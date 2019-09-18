const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const config = require("../../../../config");

exports = module.exports = {
  scheme(server, opts) {
    return {
      authenticate: function(request, h) {
        const req = request.raw.req;
        const token = req.headers.authorization;

        if (!token) {
          return Boom.unauthorized();
        }

        let decoded;
        try {
          decoded = jwt.verify(token, config.jwt.secret);
          const credentials = {
            token: token
          };
          const artifacts = {
            user: decoded.user
          };
          return h.authenticated({ credentials, artifacts });
        } catch (err) {
          return Boom.unauthorized(err.message);
        }
      }
    };
  }
};
