const express = require('express')
const router = express.Router()
const Hotel = require('../models/Hotel')

router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findOne({_id: req.params.id})
        if (!hotel) {
            return res.status(404).send(null) 
        }
        res.status(200).send(hotel)
    } catch(err) {
        res.status(500).send({message: err})
    }
})



module.exports = router