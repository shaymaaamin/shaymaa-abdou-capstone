exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('assets').del()
        .then(function () {
            // Inserts seed entries
            return knex('assets').insert([
                {
                    name: 'Asset 1',
                    description: 'Description for Asset 1',
                    type: 1,
                    lat: 43.6339676,
                    lng: -79.394823
                },

                {
                    name: 'Asset 2',
                    description: 'Description for Asset 2',
                    type: 2,
                    lat: 43.6369865,
                    lng: -79.410435
                },

            ]);
        });
};