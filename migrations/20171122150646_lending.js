
exports.up = function(knex, Promise) {
    return knex.schema.createTable('lending', function(table) {
        table.uuid('id').primary();
        table.string('userId').notNullable();
        table.string('bookId').notNullable();
        table.string('status').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('lending');
};
