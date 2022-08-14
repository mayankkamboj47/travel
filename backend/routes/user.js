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

router.get('/wishlist/remove', async (req, res) => {
    if (!req.query.hotel) return res.status(400).send(null);
    if(!req.user) return res.status(401).status(null)
    try{
        const user = await User.findOne({name : req.user.name})
        user.wishlist = user.wishlist.filter(x=>x!=req.query.hotel)
        await user.save()
        res.status(200).send(null)
    }
    catch(err) {
        return res.status(500).send(err)
    }
});

router.get('/wishlist/id', async (req, res)=>{
    if(req.user) return res.status(200).send(req.user.wishlist);
    else return res.status(500).json(null);
})

router.get('/wishlist', async (req, res)=>{
    if(!req.user) return res.status(401).json(null);
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
    if(!req.user) return res.status(401).json(null);
    try {
        let hotels = await Hotel.find({_id : {$in : req.user.visited}});
        return res.status(200).json(hotels);
    }
    catch{
        res.status(500).json(null);
    }
})
module.exports = router

