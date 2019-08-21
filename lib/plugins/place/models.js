const validate = require("../../helpers/validations");
const { omit, merge } = require("ramda");
const Joi = require("@hapi/joi");

const Place = {
  slug: validate.short_text(),
  name: validate.short_text().required(),
  address: validate.medium_text().required(),
  website: validate
    .long_text()
    .allow("")
    .optional(),
  facebook: validate
    .long_text()
    .allow("")
    .optional(),
  phone: validate
    .medium_text()
    .allow("")
    .optional(),
  hours: validate
    .long_text()
    .allow("")
    .optional(),
  email: validate
    .email()
    .allow("")
    .optional(),
  latitude: validate.number().required(),
  longitude: validate.number().required(),
  category: validate.short_text().required(),
  product_types: Joi.array().items(Joi.string()).required()
};

exports = module.exports = {
  Place: Place,
  Search: merge(Place, { distance: validate.number() }),
  Create: merge(omit(["slug"], Place), {
    op: validate
      .email()
      .allow("")
      .optional()
  }),
  Update: omit(Place, ["slug"])
};
