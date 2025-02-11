const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: { type: String, default: '' },
    image: { type: String, default: '' },
    hide: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
});

Schema.set('timestamps', true);

module.exports = Schema;