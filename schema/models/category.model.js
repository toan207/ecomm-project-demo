const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String, default: '' },
    hide: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
});

CategorySchema.set('timestamps', true);

module.exports = CategorySchema;