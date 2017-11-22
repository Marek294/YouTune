
exports.up = function(knex, Promise) {
    return knex.schema.createTable('lendingHistory', function(table) {
        table.uuid('id').primary();
        table.string('userId').notNullable();
        table.string('bookId').notNullable();
        table.string('status').notNullable();
        table.timestamp('lent').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('lendingHistory');
};
