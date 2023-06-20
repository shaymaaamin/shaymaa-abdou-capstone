exports.seed = function (knex) {
    // Deletes all existing entries and resets primary keys
    return knex('priorities')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('priorities').insert([
                { id: 1, name: 'Low' },
                { id: 2, name: 'Medium' },
                { id: 3, name: 'High' },
            ]);
        });
};
