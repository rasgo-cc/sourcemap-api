const routes = require("./routes");

exports.plugin = {
  name: "user",
  register: routes
};
