const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    ISBN: String,
    available: Boolean,
});

module.exports = mongoose.model('Book', bookSchema);
