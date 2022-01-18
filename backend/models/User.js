const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    }
})

module.exports = mongoose.model('User', userSchema)