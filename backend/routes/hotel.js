const express = require('express')
const router = express.Router()
const Hotel = require('../models/Hotel')
const User = require('../models/User')

router.get('/search/:string', async (req, res)=>{
    /**
     * Fails when data has rating : null,
     * This is possible for newer hotels, so
     * Escape this for the cases where the user wants EVERY hotel
     */
    let pageNumber;
    if(req.query.page){
        pageNumber = parseInt(req.query.page);
        delete req.query.page;
        console.log("page is set!", pageNumber);
    }
    let searchQuery = {
        title : {$regex : req.params.string==='all' ? /.*/: new RegExp(req.params.string, 'i')},
        ...hotelSearchQuery(parseURIQuery(req.query))
    }
    console.log(searchQuery);
    let hotels;
    if(pageNumber!==undefined)
    hotels = await Hotel.find(searchQuery).skip(pageNumber*10).limit(10);
    else hotels = await Hotel.find(searchQuery);
    console.log(hotels);
    res.status(200).json(hotels);
})

router.get('/locationSearchTest', async (req, res)=>{
    res.status(200).json(await Hotel.find({location : {$regex : new RegExp('Shimla, Himachal Pradesh, India','i')}}));
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
    console.log(`(${hotel.rating}*${hotel.reviews}+${req.query.rating})/${hotel.reviews + 1}`)
    hotel.rating = (hotel.rating * hotel.reviews + parseInt(req.query.rating))/(hotel.reviews + 1);
    hotel.reviews = hotel.reviews + 1;
    await hotel.save()
    return res.status(200).json(newReview);
});

router.get('/:id/book', async (req,res)=>{
    if(!req.user) return res.status(401).json('Please login');
    const user = await User.findOne({name : req.user.name});
    user.visited.push(req.params.id);
    await user.save();
    return res.status(200).json(null);
})

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
        if(query[key]==='false') continue;
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
            [$gt, $lt] = obj[key].map(Number);
            searchQueryObj[key] = {$gt, $lt};
        }
        else searchQueryObj[key] = obj[key];
    }
    if(searchQueryObj.amenities.$all.length===0) delete searchQueryObj.amenities;
    return searchQueryObj;
}
module.exports = router