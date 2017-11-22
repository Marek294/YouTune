/* eslint linebreak-style: ["error", "windows"] */

import bookshelf from '../bookshelf';
import Comment from './comment';
import Lending from './Lending';

export default bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    comment: function () {
        return this.belongsTo(Comment)
    },
    lending: function () {
        return this.hasMany(Lending, 'userId')
    }
})