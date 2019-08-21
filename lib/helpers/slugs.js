const slug = require("url-slug");
const shortid = require("shortid");
const { isEmpty } = require("lodash");

exports = module.exports = {
  createFrom(str) {
    str = slug(str, "-", slug.transformers.lowercase);
    str = str.substring(0, 64);
    return str;
  },
  generate() {
    return shortid.generate();
  }
};
