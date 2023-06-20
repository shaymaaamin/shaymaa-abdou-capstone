exports.seed = function (knex) {
    // Deletes all existing entries and resets primary keys
    return knex('statuses')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('statuses').insert([
          { id: 1, name: 'Open' },
          { id: 2, name: 'In Progress' },
          { id: 3, name: 'Resolved' },
        ]);
      });
  };
  