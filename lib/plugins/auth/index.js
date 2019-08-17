import routes from "./routes";
import { BasicAuth, GoogleAuth, FacebookAuth } from "./providers";

exports.plugin = {
  name: "auth",
  register: (server, opts) => {
    server.auth.strategy("basic", "basic", BasicAuth());
    server.auth.strategy("google", "bell", GoogleAuth(server));
    server.auth.strategy("facebook", "bell", FacebookAuth(server));

    routes(server, opts);
  }
};
