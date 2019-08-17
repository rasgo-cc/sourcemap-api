exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("email").notNull();
    t.string("name").notNull();
    t.boolean("active")
      .notNull()
      .defaultTo(false);
    t.string("role");
    t.string("password");
    t.dateTime("created_at")
      .notNull()
      .defaultTo(knex.fn.now());
    t.dateTime("updated_at").nullable();
    t.dateTime("deleted_at").nullable();

    t.unique("email");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
