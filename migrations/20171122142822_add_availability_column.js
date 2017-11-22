
exports.up = function(knex, Promise) {
    return knex.schema.table('books', function(table) {
        table.bool('availability').defaultTo(true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('books', function(table) {
        table.dropColumn('availability');
    });
};
