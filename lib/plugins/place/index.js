exports = module.exports = {
  plugin: {
    name: "place",
    register: require("./routes")
  },
  methods: require("./methods"),
  models: require("./models")
};
