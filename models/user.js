const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        email: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
                },
                msg: `Email is not valid!`
            },
            required: [true, 'Email is required!'],
            unique: [true, 'Email is already in use!']
        },
        password: {
            type: String,
            required: [
                true,
                'Password is required (Should have 1 lowercase letter, 1 uppercase letter, 1 number and be  at least 8 characters long)'
            ]
        },
        steam: String,
    },
    {collection: 'users'}
);

const User = mongoose.model('user', UserSchema);

module.exports = User;

