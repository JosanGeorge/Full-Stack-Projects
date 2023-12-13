const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: String,
    progress: { type: Number, default: 0 },
    goal: Number,
});

module.exports = mongoose.model('Habit', habitSchema);
