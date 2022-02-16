const express = require('express')
const router = express.Router()
const Hotel = require('../models/Hotel')

/**
 * X=true // see if amenities etc. (the tags) have this
 * X=4-5  // see if there is a value that corresponds to this property
 * and this value is between 4 to 5. 
 * X=Lonavla, Maharastra // Just a generic query, see if a property matches this
 * 
 * example : kitchen=true&Free Parking=true&price=200-1000&location=Lonavla, Maharashtra
 * {
 *  kitchen : true, 
 *  Free Parking : true,
 *  price : [200, 1000],
 *  location : 'Lonavla, Maharashtra'
 * }
 * =====>
 * {
 *    amenities : {$all : ['kitchen', 'Free Parking']},
 *    price : {$min : 200, $max : 1000},
 *    location : 'Lonavla, Maharashtra'
 * }
 */
router.get('/search', async (req, res)=>{
    console.log(req.query);
})

router.get('/:id/review', async (req, res)=>{
    if(!req.user) {
        console.log('Not logged in');
        return res.status(401).json('Please login');
    }
    if(!req.query.rating){
        console.log('No rating given');
        res.status(400).json('No rating given');
    } 
    const hotel = await Hotel.findOne({_id : req.params.id })
    if(!hotel) return res.status(404).json(null)
    console.log('Adding review to hotel', hotel);
    const newReview = {
        text : req.query.text,
        name : req.user.name,
        rating : req.query.rating,
        verified : false
    }
    hotel.reviewData.push(newReview)
    await hotel.save()
    return res.status(200).json(newReview);
});

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

router.get('/', async (req, res) =>{
    res.json(await Hotel.find({}));
})
function parseURIQuery(query){
    let parsedQuery = {};
    for(let key in query){
        if(query[key]==='true') parsedQuery[key] = true;
        else if(query[key].indexOf('-')>-1) parsedQuery[key] = query[key].split('-').map(x=>new Number(x))
        else parsedQuery[key] = query[key];
    }
    return parsedQuery;
}
function hotelSearchQuery(obj){
    let searchQueryObj = {amenities:{
        $all : []
    }};
    for(let key in obj){
        if(typeof obj[key]==='boolean' && obj[key]) searchQueryObj.amenities.$all.push(key);
        else if(typeof obj[key]==='object'){
            [$min, $max] = obj[key];
            searchQueryObj[key] = {$min, $max};
        }
        else searchQueryObj[key] = obj[key];
    }
    return searchQueryObj;
}
module.exports = router