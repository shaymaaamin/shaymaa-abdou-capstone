exports.up = function (knex) {
    return knex.schema.createTable('jobs', function (table) {
            table.increments('id').primary();
            table.string('title');
            table.string('description');

            table.integer('asset_id').unsigned().references('id').inTable('assets');
            table.integer('fault_id').unsigned().references('id').inTable('faults');
            table.integer('priority_id').unsigned().references('id').inTable('priorities');
            table.integer('employee_id').unsigned().references('id').inTable('employees');
            table.integer('status_id').unsigned().references('id').inTable('statuses');

            table.date('estimated_arrival');
            table.date('estimated_completion');
            table.date('actual_arrival');
            table.date('actual_completion');
            
            table.timestamps(true, true);
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('jobs');
};