exports.up = function(knex, Promise) {
  return knex.schema.createTable("places", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("slug").notNull();
    t.string("name").notNull();
    t.string("address").notNull();
    t.string("website");
    t.string("facebook");
    t.string("phone");
    t.string("email");
    t.string("hours");
    t.string("category_slug").references("categories.slug");
    t.float("latitude").notNull();
    t.float("longitude").notNull();
    t.boolean("active")
      .notNull()
      .defaultTo(false);
    t.string("op");
    t.string("updated_by");
    t.dateTime("created_at")
      .notNull()
      .defaultTo(knex.fn.now());
    t.dateTime("updated_at").nullable();
    t.dateTime("deleted_at").nullable();

    t.unique("slug");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("places");
};
