exports.up = function(knex, Promise) {
  return knex.schema.createTable("categories", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("slug").notNull();
    t.string("name").notNull();

    t.dateTime("created_at")
      .notNull()
      .defaultTo(knex.fn.now());
    t.dateTime("updated_at").nullable();
    t.dateTime("deleted_at").nullable();

    t.unique("slug");
  });
};

exports.down = function(knex, Promise) {
  return sknex.schema.dropTable("categories");
};
