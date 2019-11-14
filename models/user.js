const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO ADD VALIDATION

const UserSchema = new Schema({
    email: String,
    password: String,
    steam: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

