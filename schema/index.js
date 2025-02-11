const mongoose = require("mongoose");
const configs = require('../configs');

const db = mongoose.createConnection(configs.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.model('Account', require('./models/account.model'));
db.model('Session', require('./models/session.model'));
db.model('Vietnam', require('./models/vietnam.model'));
db.model('Branch', require('./models/branch.model'));
db.model('Category', require('./models/category.model'));

module.exports = db;
