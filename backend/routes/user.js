const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', (req, res) => {
    console.log(req.user)
    const user = req.user || null
    res.json(user)
})

router.put('/wishlist', async (req, res) => {
    if (!req.body.hotel) {
        return res.status(400).send(null)
    }
    
    const user = req.user || null
    
    if (!user) {
        return res.status(403).send(null)
    }

    try {
        const updateduser = await User.findOneAndUpdate({name: user.name}, {$push : {wishlist: req.body.hotel}})
        return res.status(200).send(null)
    } catch(err) {
        console.log(err)
        return res.status(500).send(err)
    }
})

module.exports = router

