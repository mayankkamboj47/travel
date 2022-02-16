const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    _id: Number,
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
    price: Number,
    reviewData : [{
        name : String,
        text : String,
        verified : Boolean,
        rating : Number
    }],
    location : String
})

module.exports = mongoose.model('Hotel', hotelSchema)