const validate = require("../../helpers/validations");

const User = {
  email: validate.email(),
  name: validate.long_text(),
  password: validate.long_text()
};
