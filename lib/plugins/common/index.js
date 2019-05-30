const routes = require("./routes");

exports.plugin = {
  name: "common",
  register: routes
};
