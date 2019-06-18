const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const validator = require('validator');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    email: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email'
            }
        },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

UserSchema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted
        next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = {User}
