const validate = require("../../helpers/validations");
const { omit } = require("lodash");

const User = {
  email: validate.email(),
  name: validate.long_text(),
  password: validate.long_text()
};
