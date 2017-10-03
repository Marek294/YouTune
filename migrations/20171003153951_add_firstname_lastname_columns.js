
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.string('firstname').defaultTo('');
        table.string('lastname').defaultTo('');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.dropColumn('firstname');
        table.dropColumn('lastname');
    });
};
