/* eslint linebreak-style: ["error", "windows"] */

import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from '../knexfile';

export default bookshelf(knex(knexConfig.development));