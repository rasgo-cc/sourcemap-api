const config = require("../../../config");

const simpleAuth = {
  validate: async (request, username, password) => {
    let credentials = {
      user: username
    };
    return {
      isValid:
        username == config.auth.simple.user &&
        password == config.auth.simple.password,
      credentials: credentials
    };
  },
  allowEmptyUsername: false
};

exports.plugin = {
  name: "auth",
  register: (server, _opts) => {
    server.auth.strategy("simple", "basic", simpleAuth);
  }
};
