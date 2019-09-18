const config = require("../../../config");
const logger = require("pino")(config.logger);
const db = require("../../../db");
const slugs = require("../../helpers/slugs");
const { isEmpty, merge } = require("ramda");
const Boom = require("@hapi/boom");

import Geohash from "latlon-geohash";

// curl "localhost:8080/api/places/search?lat=38.731796&lng=-9.139386"

const methods = {
  search: async params => {
    const { lat, lng } = params;

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
        .bind(logger)
        .catch(logger.error);

      result = result.rows;
      
      const key = `search:${geohash}`
      db.redis.set(key, JSON.stringify(result), 'EX', config.db.redis.expire);
    }

    logger.debug({
      msg: "search",
      lat: lat,
      lng: lng,
      geohash: geohash,
      results: result.data.length
    });

    return result;
  },
  async findOne(data) {
    const place = await db
      .knex("places")
      .where(data)
      .select()
      .limit(1)
      .first();

    return isEmpty(place) ? null : place;
  },
  createSomethingWrong: async data => {
    return;
  },
  patchSomethingWrong: data => {
    return;
  },
  createPlace: async data => {
    const category = await db
      .knex("categories")
      .where({ slug: data.category_slug })
      .select()
      .first();
    if (!category) {
      throw Boom.badRequest("invalid category");
    }
    return await db
      .knex("places")
      .insert(merge(data, { slug: slugs.generate() }));
  }
};

exports = module.exports = methods;
