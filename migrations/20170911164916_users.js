
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('email').notNullable().unique();
        table.string('password_digest').notNullable();
        table.boolean('confirmed').notNull().defaultTo(0);
        table.string('confirmationToken').defaultTo('');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
