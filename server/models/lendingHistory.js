import bookshelf from '../bookshelf';
import Book from './book';

bookshelf.plugin(require('bookshelf-uuid'))

export default bookshelf.Model.extend({
    tableName: 'lendingHistory',
    uuid: true,
    hasTimestamps: true,
    book: function () { 
        return this.belongsTo(Book) 
    }
})