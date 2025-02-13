const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    image: { type: String, default: '' },
    order: { type: Number, default: 0 },
    hide: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
});

Schema.set('timestamps', true);

module.exports = Schema;