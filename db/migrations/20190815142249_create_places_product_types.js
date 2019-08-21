exports.up = function(knex, Promise) {
  return knex.schema.createTable("places_product_types", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("place_slug").references("places.slug");
    t.string("product_type_slug").references("product_types.slug");
    t.dateTime("created_at")
      .notNull()
      .defaultTo(knex.fn.now());
    t.dateTime("updated_at").nullable();
    t.dateTime("deleted_at").nullable();

    t.unique(["place_slug", "product_type_slug"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("places_product_types");
};
