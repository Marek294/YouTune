/* eslint object-shorthand: */
/* eslint func-names: */

import bookshelf from '../bookshelf';
import User from './user';

bookshelf.plugin(require('bookshelf-uuid'))
bookshelf.plugin('pagination')

export default bookshelf.Model.extend({
    tableName: 'messages',
    uuid: true,
    hasTimestamps: true,
    sender: function () {
        return this.hasOne(User, 'id', 'senderId')
    },
    receiver: function () {
        return this.hasOne(User, 'id', 'receiverId')
    }
})