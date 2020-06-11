const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    name: {
        first: String,
        middle: String,
        last: String,
        _id: false
    },
    password: String,
    birthDate: {
        year: Number,
        month: Number,
        day: Number
    },
    gender: String,
    contact: {
        _id: false,
        phone: String,
        email: String,
        address: {
            _id: false,
            country: String,
            state: String,
            city: String,
            street: String,
            house: String,
            appartment: String
        }
    },
    last_edited: Date
});

userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('user', userSchema);

module.exports = User;