import routes from "./routes";
const jwt = require("./jwt");
import { BasicAuth, GoogleAuth, FacebookAuth } from "./strategies";

exports.plugin = {
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
