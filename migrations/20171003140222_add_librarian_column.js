
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.boolean('librarian').defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.dropColumn('librarian');
    });
};
