const Joi = require("@hapi/joi");
const methods = require("./methods");
const validate = require("../../helpers/validations");
const { validateCreate, validateUpdate } = require("./models");
const crudy = require("hapi-crudy");
const models = require("./models");
import Boom from "@hapi/boom";

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
      response: {
        modify: true,
        options: { stripUnknown: true },
        schema: { data: Joi.array().items(models.PlaceSearch) }
      },
      handler: async function(request, h) {
        console.log("search", request.query);
        const results = await methods.search(request.query);
        return h.response({ data: results });
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
    crudValidateCreate: { place: models.PlaceCreate },
    crudValidateUpdate: { place: models.PlaceUpdate },
    crudRead: {
      response: {
        modify: true,
        options: { stripUnknown: true },
        schema: { place: models.Place }
      },
      handler: async (request, h) => {
        const place = await methods.findOne({
          permalink: request.params.permalink
        });
        return place ? h.response({ place: place }) : Boom.notFound();
      }
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
