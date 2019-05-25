exports.up = function(knex, Promise) {
  return knex.schema.createTable("places", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("permalink").notNull();
    t.string("name").notNull();
    t.string("address").notNull();
    t.string("website");
    t.string("facebook");
    t.string("phone");
    t.string("email");
    t.string("hours");
    t.string("country_code");
    t.float("latitude").notNull();
    t.float("longitude").notNull();
    t.dateTime("created_at")
      .notNull()
      .defaultTo(knex.fn.now());
    t.dateTime("updated_at").nullable();
    t.dateTime("deleted_at").nullable();

    t.unique("permalink");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("places");
};
