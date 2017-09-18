
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.string('resetPasswordToken').defaultTo('');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.dropColumn('resetPasswordToken');
    });
};
