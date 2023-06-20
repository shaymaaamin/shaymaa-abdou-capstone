exports.up = function (knex) {
    return knex.schema.createTable('employee_skills', function (table) {
        table.increments('id').primary();
        table.integer('employee_id').unsigned().references('id').inTable('employees');
        table.integer('skill_id').unsigned().references('id').inTable('skills');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('employee_skills');
};