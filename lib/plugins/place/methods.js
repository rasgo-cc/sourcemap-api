const config = require("../../../config");
const logger = require("laabr"); //require("pino")(config.logger);
const db = require("../../../db");

import Geohash from "latlon-geohash";
import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";
import Boom from "@hapi/boom";

// curl "localhost:8080/api/places/search?lat=38.731796&lng=-9.139386"

const methods = {
  search: async (request, h) => {
    const { lat, lng } = request.query;

    const geohash = Geohash.encode(lat, lng, config.geohash.precision);

    let result = await db.redis.get(`search:${geohash}`);
    if (result) {
      result = JSON.parse(result);
    } else {
      result = await db.knex.schema
        .raw(
          `
        select *, round(
          ST_Distance( 
              ST_Point(places.longitude,places.latitude)::geography,
              ST_Point(:lng,:lat)::geography
          ))::integer AS distance
        from places
        where ST_DWithin(
                ST_Point (places.longitude, places.latitude)::geography,
                ST_Point (:lng,:lat)::geography,
                10000
              )
        order by distance
        `,
          { lat: lat, lng: lng }
        )
        .bind(request.logger)
        .catch(request.logger.error);

      const rows = result.rows;
      result = {
        data: rows
      };

      db.redis.set(`search:${geohash}`, JSON.stringify(result));
    }

    request.logger.info({
      msg: "search",
      lat: lat,
      lng: lng,
      geohash: geohash,
      results: result.data.length
    });

    return h.response({ data: result });
  },
  async readOne(request, h) {
    const place = omit(
      await db
        .knex("places")
        .where({ permalink: request.params.permalink })
        .select()
        .limit(1)
        .first(),
      ["id"]
    );
    if (!isEmpty(place)) {
      return h.response({ place: place });
    } else {
      return Boom.notFound();
    }
  }
};

exports = module.exports = methods;
