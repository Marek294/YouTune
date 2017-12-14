import bookshelf from '../bookshelf';

export default bookshelf.Model.extend({
    tableName: 'openingHours',
    hasTimestamps: true
})