
exports.up = function(knex, Promise) {
    return knex.schema.table('books', function(table) {
        table.string('summary',2000).defaultTo('');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('books', function(table) {
        table.dropColumn('summary');
    });
};
