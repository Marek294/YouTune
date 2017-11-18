
exports.up = function(knex, Promise) {
    return knex.schema.createTable('votes', function(table) {
        table.uuid('id').primary();
        table.string('userId').notNullable();
        table.string('bookId').notNullable();
        table.boolean('isPositive').notNull().defaultTo(0);
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('votes');
};
