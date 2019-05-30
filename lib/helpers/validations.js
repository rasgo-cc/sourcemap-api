const Joi = require("joi");

const validations = {
  object(data) {
    return Joi.object(data);
  },
  id() {
    return Joi.string().regex(/[A-Fa-f0-9]{1,128}/);
  },
  email() {
    return Joi.string()
      .email()
      .lowercase();
  },
  token() {
    return Joi.token();
  },
  short_text() {
    return Joi.string()
      .min(1)
      .max(128);
  },
  medium_text() {
    return Joi.string()
      .min(1)
      .max(256);
  },
  long_text() {
    return Joi.string()
      .min(1)
      .max(512);
  },
  number() {
    return Joi.number();
  },
  coordinates() {
    return Joi.array()
      .items(Joi.number())
      .max(2);
  }
};

exports = module.exports = validations;
