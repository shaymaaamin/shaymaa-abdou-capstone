exports.seed = function (knex) {
    // Deletes all existing entries and resets primary keys
    return knex('skills')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('skills').insert([
                { id: 1, name: 'Electrical Troubleshooting' },
                { id: 2, name: 'Wiring Installation' },
                { id: 3, name: 'Equipment Repair' },
            ]);
        });
};
