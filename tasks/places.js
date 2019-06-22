const fs = require("fs");
const csv = require("csv-parser");
const db = require("../db");

const csvAgrobioPath = "tasks/data/agrobio_geo.csv";

desc("Seed places from csv");
task("seed", [], params => {
  places = [];

  fs.createReadStream(csvAgrobioPath)
    .pipe(csv())
    .on("data", data => {
      data.permalink = `permalink_${places.length}`;
      data.country_code = data.countryCode;
      delete data.countryCode;
      data.latitude = parseFloat(data.latitude);
      data.longitude = parseFloat(data.longitude);
      data = new Object(data);
      places.push(data);
    })
    .on("end", () => {
      db.knex("places")
        .insert(places)
        .bind(console)
        .then(console.log)
        .then(console.error)
        .finally(() => {
          return db.knex.destroy();
        });
    });
});
