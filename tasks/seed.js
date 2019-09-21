const fs = require("fs");
const csv = require("csv-parser");
const db = require("../db");
const slugs = require("../lib/helpers/slugs");
const consola = require("consola");

desc("Seed");

task("categories", [], { async: true }, () => {
  const categories = [];

  fs.createReadStream("tasks/data/categories.csv")
    .pipe(csv())
    .on("data", data => {
      const category = {
        slug: slugs.createFrom(data.name),
        name: data.name
      };
      categories.push(category);
    })
    .on("end", async () => {
      db.knex("categories")
        .insert(categories)
        .then(() => {
          consola.success(`${categories.length} categories seeded`);
        })
        .catch(consola.error)
        .finally(() => {
          complete();
        });
    });
});

task("product_types", [], { async: true }, () => {
  const product_types = [];

  fs.createReadStream("tasks/data/product_types.csv")
    .pipe(csv())
    .on("data", data => {
      const product_type = {
        slug: slugs.createFrom(data.name),
        name: data.name
      };
      product_types.push(product_type);
    })
    .on("end", async () => {
      db.knex("product_types")
        .insert(product_types)
        .then(() => {
          consola.success(`${product_types.length} product types seeded`);
        })
        .catch(consola.error)
        .finally(() => {
          complete();
        });
    });
});

task("places", [], { async: true }, () => {
  const places = [];

  const defaultCategory = {
    slug: "supermarket"
  };

  fs.createReadStream("tasks/data/agrobio_geo.csv")
    .pipe(csv())
    .on("data", data => {
      const place = {
        slug: slugs.generate(),
        name: data.name,
        address: data.address,
        website: data.website,
        facebook: data.facebook,
        phone: data.phone,
        email: data.email,
        hours: data.hours,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        category_slug: defaultCategory.slug
      };
      places.push(place);
    })
    .on("end", async () => {
      db.knex("places")
        .insert(places)
        .then(() => {
          consola.success(`${places.length} places seeded`);
        })
        .catch(consola.error)
        .finally(() => {
          complete();
        });
    });
});

task("all", ["categories", "product_types", "places"], () => {});

jake.addListener("complete", async () => {
  await db.quit();
});
