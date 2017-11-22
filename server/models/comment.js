/* eslint object-shorthand: */
/* eslint func-names: */

import bookshelf from '../bookshelf';
import Book from './book';
import User from './user';

bookshelf.plugin(require('bookshelf-uuid'))
bookshelf.plugin('pagination')

export default bookshelf.Model.extend({
    tableName: 'comments',
    uuid: true,
    hasTimestamps: true,
    book: function () { 
        return this.belongsTo(Book) 
    },
    user: function () {
        return this.hasOne(User, 'id', 'userId')
    }
})