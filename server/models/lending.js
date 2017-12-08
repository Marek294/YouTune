import bookshelf from '../bookshelf';
import Book from './book';
import User from './user';

bookshelf.plugin(require('bookshelf-uuid'))

export default bookshelf.Model.extend({
    tableName: 'lending',
    uuid: true,
    hasTimestamps: true,
    book: function () { 
        return this.belongsTo(Book, 'bookId') 
    },
    user: function () { 
        return this.belongsTo(User, 'userId') 
    }
})