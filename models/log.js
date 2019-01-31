const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    type: String,
    date: Date,
    ip: String
});

var Log = mongoose.model('log', logSchema);

module.exports = Log;