const Hotel = require('./models/Hotel');
const fs = require('fs').promises
async function doStuff(){
  let count = 0;
  const hotels = JSON.parse(await fs.readFile('places.json', 'utf-8')).places
  console.log(hotels);
  for(let hotel of hotels){
    hotel.reviews = 0;
    hotel.price = parseInt([...hotel.price.slice(1)].filter(a=>a!=',').join(''));
  }  
  await fs.writeFile('newplaces.json', JSON.stringify(hotels));
  console.log(hotels);
}

doStuff();