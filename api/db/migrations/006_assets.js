exports.up = function (knex) {
   return knex.schema.createTable('assets', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.string('description');
        table.integer('type').unsigned().references('id').inTable('types');
        table.float('lat');
        table.float('lng');
        table.timestamps(true, true);
    });
}

exports.down = function (knex) {
    return knex.schema.dropTable("assets");
  };
  