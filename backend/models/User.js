const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    googleId: String,
    facebookId: String,
    wishlist: [String],
    visited : [String]
})

module.exports = mongoose.model('User', userSchema)