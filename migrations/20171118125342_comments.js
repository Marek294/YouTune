
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', function(table) {
        table.uuid('id').primary();
        table.string('userId').notNullable();
        table.string('bookId').notNullable();
        table.string('text').notNull().defaultTo('');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');
};

