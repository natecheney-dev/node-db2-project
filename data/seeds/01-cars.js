exports.seed = function (knex) {
    // truncating a table deletes all existing entries and resets the primary keys
    return knex('cars').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('cars').insert([
          { vin: `123456`, make: `Ford`, model: `Ranger`, mileage: 75000, title: `Nathan Cheney`, transmission: `transmission`},
          { vin: `12456`, make: `Chevy`, model: `Tahoe`, mileage: 75000, title: `Nathan Cheney`, transmission: `transmission`},
          { vin: `1256`, make: `Jeep`, model: `Cherokee`, mileage: 75000, title: `Nathan Cheney`, transmission: `transmission`}
        ]);
      });
  };
