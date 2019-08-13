const Joi = require("@hapi/joi");
const methods = require("./methods");
const validate = require("../../helpers/validations");
const { validateCreate, validateUpdate } = require("./models");
const crudy = require("hapi-crudy");

const ENDPOINT_NAME = "/places";
const ENDPOINT_TAGS = ["api", "place"];

const routes = async (server, _opts) => {
  server.route({
    method: "GET",
    path: `${ENDPOINT_NAME}/search`,
    config: {
      tags: ENDPOINT_TAGS,
      validate: {
        query: {
          lng: validate.number().required(),
          lat: validate.number().required()
        }
      },
      handler: function(request, h) {
        return methods.search(request, h);
      }
    }
  });

  crudy(server, {
    path: `${ENDPOINT_NAME}/{permalink}`,
    config: {
      tags: ENDPOINT_TAGS,
      validate: {
        params: {
          permalink: validate.short_text().required()
        }
      }
    },
    crudValidateCreate: { place: validateCreate },
    crudValidateUpdate: { place: validateUpdate },
    crudRead: (request, h) => {
      return methods.readOne(request, h);
    },
    crudCreate: (request, h) => {
      return h.response("CREATE");
    },
    crudUpdate: (request, h) => {
      return h.response("UPDATE");
    },
    crudDelete: (request, h) => {
      return h.response(`DELETE ${request.params.permalink}`);
    }
  });
};

exports = module.exports = routes;
