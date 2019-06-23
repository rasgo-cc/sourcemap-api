const config = require("../../../config");
const logger = require("pino")(config.logger);

const db = require("../../../db");

// curl "localhost:8080/api/places/search?lat=38.731796&lng=-9.139386"

const methods = {
  search: async (request, h) => {
    const { lat, lng } = request.query;

    const result = await db.knex.schema
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
      .bind(logger)
      .catch(logger.error);

    const rows = result.rows;

    logger.debug(__filename, "results", rows);

    return h.response({
      results: rows.length,
      data: rows
    });
  }
};

exports = module.exports = methods;
