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
    price: String,
    reviewData : [{
        name : String,
        text : String,
        verified : Boolean,
        rating : Number
    }]
})

module.exports = mongoose.model('Hotel', hotelSchema)