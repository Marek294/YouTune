
exports.up = function(knex, Promise) {
    return knex.schema.createTable('messages', function(table) {
        table.uuid('id').primary();
        table.string('senderId').notNullable();
        table.string('receiverId').notNullable();
        table.string('title').notNull().defaultTo('');
        table.string('body', 1000).notNull().defaultTo('');
        table.boolean('isReaded').notNull().defaultTo(0);
        table.boolean('senderDelete').notNull().defaultTo(0);
        table.boolean('receiverDelete').notNull().defaultTo(0);
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('messages');
};
