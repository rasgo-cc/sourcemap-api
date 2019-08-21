const Joi = require("@hapi/joi");

exports = module.exports = {
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
    return Joi.string()
      .min(8)
      .max(1024);
  },
  short_text() {
    return Joi.string()
      .min(1)
      .max(256);
  },
  medium_text() {
    return Joi.string()
      .min(1)
      .max(512);
  },
  long_text() {
    return Joi.string()
      .min(1)
      .max(2048);
  },
  text() {
    return Joi.string();
  },
  uri() {
    return Joi.string().uri();
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
