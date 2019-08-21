const Joi = require("@hapi/joi");
const methods = require("./methods");
const validate = require("../../helpers/validations");
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
        schema: { data: Joi.array().items(models.Search) }
      },
      handler: async function(request, h) {
        console.log("search", request.query);
        const results = await methods.search(request.query);
        return h.response({ data: results });
      }
    }
  });

  crudy(server, {
    path: `${ENDPOINT_NAME}/{slug}`,
    config: {
      tags: ENDPOINT_TAGS,
      validate: {
        params: {
          slug: validate.short_text().required()
        }
      }
    },
    crudValidateCreate: { place: models.Create },
    crudValidateUpdate: { place: models.Update },
    crudRead: {
      response: {
        modify: true,
        options: { stripUnknown: true },
        schema: { place: models.Place }
      },
      handler: async (request, h) => {
        const place = await methods.findOne({
          slug: request.params.slug
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
      return h.response(`DELETE ${request.params.slug}`);
    }
  });

  server.route({
    method: "POST",
    path: "/something-wrong",
    config: {
      tags: ENDPOINT_TAGS,
      validate: {
        payload: {
          place: validate.short_text().required(),
          message: validate
            .text()
            .min(100)
            .required(),
          email: validate.email().optional()
        }
      },
      handler: async (request, h) => {
        const data = request.payload;
        await methods.createSomethingWrong(data);
        return h.response();
      }
    }
  });

  server.route({
    method: "PATCH",
    path: "/something-wrong",
    config: {
      tags: ENDPOINT_TAGS,
      auth: "jwt",
      validate: {
        payload: {
          slug: validate.short_text().required(),
          comment: validate
            .text()
            .max(2000)
            .optional()
        }
      },
      handler: async (request, h) => {
        await methods.patchSomethingWrong();
        return h.response();
      }
    }
  });

  // curl -i -X POST -H "Content-Type: application/json" -d '{"place":{"name":"name", "address":"address", "latitude": 1.2, "longitude": 3.4, "op":"original@poster.com", "category_slug": "supermarket"}}' localhost:8080/api/contribute
  server.route({
    method: "POST",
    path: "/contribute",
    config: {
      tags: ENDPOINT_TAGS,
      validate: {
        payload: {
          place: models.Create
        }
      },
      handler: async (request, h) => {
        await methods.createPlace(request.payload.place);
        return h.response();
      }
    }
  });
};

exports = module.exports = routes;
