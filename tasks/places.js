const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const db = require("../db");

const rootPath = path.join(__dirname, "../../");
const csvAgrobioPath = path.join(rootPath, "/scripts/agrobio_geo.csv");

desc("Seed places from csv");
task("seed", [], params => {
  console.log("seed");
  //   return db
  //     .knex("places")
  //     .insert({
  //       permalink: "yyo",
  //       name: "name",
  //       address: "address",
  //       longitude: 12.23,
  //       latitude: -123.43
  //     })
  //     .returning("*")
  //     .bind(console)
  //     .then(console.log)
  //     .catch(console.error)
  //     .finally(() => {
  //       return db.knex.destroy();
  //     });

  places = [];

  fs.createReadStream(csvAgrobioPath)
    .pipe(csv())
    .on("data", data => {
      //console.log(data);
      data.permalink = `permalink_${places.length}`;
      data.country_code = data.countryCode;
      delete data.countryCode;
      data.latitude = parseFloat(data.latitude);
      data.longitude = parseFloat(data.longitude);
      data = new Object(data);
      places.push(data);
    })
    .on("end", () => {
      console.log("the end");
      console.log(places[0]);
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
