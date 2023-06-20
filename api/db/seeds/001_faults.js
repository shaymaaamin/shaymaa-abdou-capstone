exports.seed = function (knex) {
    // Deletes all existing entries and resets primary keys
    return knex('faults')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('faults').insert([
                { id: 1, name: 'Power Failure', code: 'PWR' },
                { id: 2, name: 'Overheating', code: 'OVH' },
                { id: 3, name: 'Short Circuit', code: 'SHC' },
            ]);
        });
};
