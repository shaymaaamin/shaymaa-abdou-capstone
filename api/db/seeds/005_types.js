exports.seed = function (knex) {
    // Deletes all existing entries and resets primary keys
    return knex('types')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('types').insert([
          { id: 1, name: 'Generator' },
          { id: 2, name: 'Transformer' },
          { id: 3, name: 'Circuit Breaker' },
        ]);
      });
  };
  