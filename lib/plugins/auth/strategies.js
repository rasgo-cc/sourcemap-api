import config from "../../../config";
import merge from "lodash/merge";

export const BasicAuth = () => {
  return {
    validate: async (_request, username, password) => {
      let credentials = {
        user: username
      };
      return {
        isValid:
          username == config.auth.basic.user &&
          password == config.auth.basic.password,
        credentials: credentials
      };
    },
    allowEmptyUsername: false
  };
};

export const JwtAuth = () => {
  return {
    validate
  };
};

const defaultBellOptions = {
  password: config.auth.cookie_encryption_password,
  isSecure: config.http.secure
};

export const GoogleAuth = server => {
  return merge(defaultBellOptions, {
    provider: "google",
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_SECRET,
    location: server.info.uri
  });
};

export const FacebookAuth = server => {
  return merge(defaultBellOptions, {
    provider: "facebook",
    clientId: process.env.FACEBOOK_AUTH_APP_ID,
    clientSecret: process.env.FACEBOOK_AUTH_APP_SECRET,
    location: server.info.uri
  });
};
