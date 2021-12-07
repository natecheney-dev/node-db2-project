exports.up = function (knex) {
  return knex.schema.createTable('cars', table => {
    table.increments()
    table.string('vin', 64)
      .unique()
      .notNullable()
    table.string('make', 64)
      .notNullable()
    table.string('model', 64)
      .notNullable()
    table.double('mileage')
      .notNullable()
    table.string('title')
    table.string('transmission')
  })
};

exports.down =  function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
