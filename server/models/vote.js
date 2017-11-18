/* eslint object-shorthand: */
/* eslint func-names: */

import bookshelf from '../bookshelf';
import Book from './book';

bookshelf.plugin(require('bookshelf-uuid'))

export default bookshelf.Model.extend({
    tableName: 'votes',
    uuid: true,
    hasTimestamps: true,
    book: function () { 
        return this.belongsTo(Book) 
    }
})