const routes = require("./routes");
const jwt = require("./jwt");
const { BasicAuth, GoogleAuth, FacebookAuth } = require("./strategies");

exports = module.exports = {
  name: "auth",
  register: (server, opts) => {
    server.auth.scheme("jwt", jwt.scheme);

    server.auth.strategy("basic", "basic", BasicAuth());
    server.auth.strategy("google", "bell", GoogleAuth(server));
    server.auth.strategy("facebook", "bell", FacebookAuth(server));
    server.auth.strategy("jwt", "jwt");
    routes(server, opts);
  }
};
