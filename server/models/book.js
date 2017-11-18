/* eslint linebreak-style: ["error", "windows"] */
/* eslint object-shorthand: */
/* eslint func-names: */

import bookshelf from '../bookshelf';
import Vote from './vote';

export default bookshelf.Model.extend({
    tableName: 'books',
    hasTimestamps: true,
    votes: function () { 
        return this.hasMany(Vote, 'bookId') 
    }
})