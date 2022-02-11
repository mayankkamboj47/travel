const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    rooms: {
        guests: Number,
        bedrooms: Number,
        beds: Number,
        bathrooms: Number,
    },
    amenities: [String],
    title: String,
    subtitle: String,
    rating: Number,
    password: {
        type: String,
    },
    reviews: Number,
    images: [String],
    price: String,
})

module.exports = mongoose.model('Hotel', hotelSchema)