/* eslint linebreak-style: ["error", "windows"] */
/* eslint object-shorthand: */
/* eslint func-names: */

import bookshelf from '../bookshelf';
import Vote from './vote';
import LendingHistory from './lendingHistory';
import Comment from './comment';

bookshelf.plugin(require('bookshelf-cascade-delete'));

export default bookshelf.Model.extend({
    tableName: 'books',
    hasTimestamps: true,
    votes: function () { 
        return this.hasMany(Vote, 'bookId') 
    },
    lendingHistory: function () {
        return this.hasMany(LendingHistory, 'bookId')
    },
    comments: function () {
        return this.hasMany(Comment, 'bookId')
    }
}, {
    dependents: ['votes', 'lendingHistory', 'comments']
  })