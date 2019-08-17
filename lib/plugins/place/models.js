const validate = require("../../helpers/validations");
const { omit, merge } = require("lodash");

const Place = {
  permalink: validate.short_text(),
  name: validate.short_text().required(),
  address: validate.medium_text().required(),
  website: validate.long_text().allow(""),
  facebook: validate.long_text().allow(""),
  phone: validate.medium_text().allow(""),
  hours: validate.long_text().allow(""),
  email: validate.email().allow(""),
  countryCode: validate.short_text().allow(""),
  latitude: validate.number().required(),
  longitude: validate.number().required()
};

exports = module.exports = {
  Place: Place,
  PlaceSearch: merge(Place, { distance: validate.number() }),
  PlaceCreate: omit(Place, ["permalink"]),
  PlaceUpdate: omit(Place, ["permalink"])
};
