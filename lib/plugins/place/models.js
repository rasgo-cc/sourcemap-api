const validate = require("../../helpers/validations");
const { omit } = require("lodash");

const Place = {
  permalink: validate.short_text(),
  name: validate.short_text(),
  address: validate.medium_text(),
  website: validate.long_text(),
  facebook: validate.long_text(),
  phone: validate.medium_text(),
  hours: validate.long_text(),
  email: validate.email(),
  countryCode: validate.short_text(),
  coordinates: validate.coordinates()
};

let validateCreate = omit(Place, ["permalink"]);
validateCreate.name = Place.name.required();

const validateUpdate = omit(Place, ["permalink"]);

exports = module.exports = {
  Place: Place,
  validateCreate: validateCreate,
  validateUpdate: validateUpdate
};
