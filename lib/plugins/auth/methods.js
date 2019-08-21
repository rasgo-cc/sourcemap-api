const Boom = require("@hapi/boom");
const config = require("../../../config");
const User = require("../user/methods");
const jwt = require("jsonwebtoken");
const logger = require("@/lib/logger");

exports = module.exports = {
  socialDefaultHandler: async (request, h) => {
    if (!request.auth.isAuthenticated) {
      return Boom.forbidden(request.auth.error.message);
    }

    const credentials = request.auth.credentials;
    const profile = credentials.profile;

    // Make sure user exists (if it doesn't, create one)
    let user = await User.findOne({
      email: profile.email
    });

    if (!user) {
      try {
        const params = {
          email: profile.email,
          name: profile.displayName,
          password: "",
          active: true,
          role: config.roles.CONTRIBUTOR
        };
        await User.create(params);
        user = await User.findOne({ email: profile.email });
      } catch (e) {
        logger.fatal("failed to create user", params);
      }
    }

    if (!user) {
      return Boom.badImplementation("failed to auth user");
    }

    // Generate JWT auth token
    const token = jwt.sign(
      {
        user: {
          email: user.email,
          role: user.role
        }
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn
      }
    );

    return h
      .response({ token: token, email: user.email })
      .state("token", token);
  },
  signOut: (request, h) => {
    return h.response();
  }
};
