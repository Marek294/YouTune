/* eslint linebreak-style: ["error", "windows"] */

import bookshelf from '../bookshelf';
import Comment from './comment';

export default bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    comment: function () {
        return this.belongsTo(Comment)
    }
})