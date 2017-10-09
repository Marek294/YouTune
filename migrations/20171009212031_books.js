
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('author').notNullable();
        table.string('cover',1000).defaultTo('');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books');
};
