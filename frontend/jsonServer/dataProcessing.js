const fs = require('fs').promises

const FILE = 'scrapedData.json'
async function processData(file){
  console.log('Reading file...')
  file = await fs.readFile(file, 'utf-8')
  console.log('Parsing json...')
  const json = JSON.parse(file)
  return json
}

async function addIndex(data) {
  for(let i=0;i<data.places.length;i++){
    data.places[i]['_id']=i
  }
  return data
}

async function write(data, file){
  return fs.writeFile(file, JSON.stringify(data))
}

processData(FILE).then(peek).then(data=>data.map((e,_id)=>{
	e._id=_id
	return e
})).then(peek).then(d=>write(d, FILE))
function peek(x){
	for(let sub of x) console.log(sub);
	return x;
}
function transformAmenities(data){
	for(let sub of data) sub.amenities = sub.amenities.split('·').map(x=>x.trim())
	return data
}
function transformRooms(data){
	return data.map(hotel=>{
		hotel.rooms = hotel.rooms.map(val=>val.split(' ')).map(([num,...words])=>{
			let x = {}
			x[words.join(' ')] = Number(num)
			return x
		}
		)
		return hotel
	})
}
function numifyRating(data){
	return data.map(hotel=>{
		hotel.rating = hotel.rating ? Number(hotel.rating) : undefined;
		return hotel
	})
}
function processReviews(data){
	return data.map(hotel=>{
		hotel.reviews = hotel.reviews ? Number(hotel.reviews.slice(2).split(' ')[0]) : undefined;
		return hotel;
	});
}
function processPrice(data){
  return data.map(hotel=>{
    	hotel.price = Number([...hotel.price[0]].filter(isNumeric).join('')) 
	return hotel
  })
  function isNumeric(s){
	  return s.charCodeAt(0)>=48 && s.charCodeAt(0)<=57
  }
}
