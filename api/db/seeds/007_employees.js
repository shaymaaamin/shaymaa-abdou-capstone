exports.seed = function (knex) {
    // Deletes all existing entries and resets primary keys
    return knex('employees')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('employees').insert([
                {
                    id: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                    email_address: 'johndoe@example.com',
                    phone_number: '1234567890',
                    lat: 43.6451308,
                    lng: -79.3939526,
                    status: "online"
                },
                {
                    id: 2,
                    first_name: 'Jane',
                    last_name: 'Smith',
                    email_address: 'janesmith@example.com',
                    phone_number: '9876543210',
                    lat: 43.6463918,
                    lng: -79.4123114,
                    status: "busy"
                },
                {
                    id: 3,
                    first_name: 'Michael',
                    last_name: 'Johnson',
                    email_address: 'michaeljohnson@example.com',
                    phone_number: '5551234567',
                    lat: 43.6437238,
                    lng: -79.4031262,
                    status: "away"
                },
            ]);
        });
};
