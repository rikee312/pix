const Bookshelf = require('../../../infrastructure/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'followers'
});
