
exports.up = function(knex, Promise) {
    return knex.schema.createTable('openingHours', function(table) {
        table.increments();
        table.string('day').notNullable();
        table.time('from').notNullable();
        table.time('to').notNullable();
        table.boolean('isOpen').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('openingHours');
};
