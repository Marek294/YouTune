/* eslint linebreak-style: ["error", "windows"] */

import bookshelf from '../bookshelf';

export default bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true
})