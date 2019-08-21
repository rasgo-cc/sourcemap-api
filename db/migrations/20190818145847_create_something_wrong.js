exports.up = function(knex, Promise) {
  return knex.schema.createTable("something_wrong", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("slug").notNull();
    t.string("place_slug").references("places.slug");
    t.text("message").notNull();
    t.string("op");
    t.text("comment");
    t.boolean("resolved")
      .notNull()
      .defaultTo(false);
    t.string("updated_by");
    t.dateTime("created_at")
      .notNull()
      .defaultTo(knex.fn.now());
    t.dateTime("updated_at").nullable();

    t.unique("slug");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("something_wrong");
};
