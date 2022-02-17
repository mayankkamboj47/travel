const express = require('express')
const Hotel = require('../models/Hotel')
const router = express.Router()
const User = require('../models/User')

router.get('/', (req, res) => {
    console.log(req.user)
    const user = req.user || null
    res.json(user)
})

router.get('/wishlist/add', async (req, res) => {
    if (!req.query.hotel) return res.status(400).send(null)
    const user = req.user || null
    if (!user) {
        return res.status(403).send(null)
    }
    try {
        const updateduser = await User.findOneAndUpdate({name: user.name}, {$push : {wishlist: req.query.hotel}})
        return res.status(200).send(null)
    } catch(err) {
        console.log(err)
        return res.status(500).send(err)
    }
})

router.get('/wishlist', async (req, res)=>{
    const wishlist = req.user.wishlist;
    try {
        let hotels = await Hotel.find({_id : {$in : wishlist}})
        return res.status(200).json(hotels);
    }
    catch {
        res.status(500).json(null);
    }
});

router.get('/visited', async (req, res)=>{
    const visited = req.user.visited;
    try {
        let hotels = await Hotel.find({_id : {$in : visited}});
        return res.status(200).json(hotels);
    }
    catch{
        res.status(500).json(null);
    }
})
module.exports = router

