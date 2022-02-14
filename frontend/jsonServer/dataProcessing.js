const fs = require('fs').promises

async function processData(){
  console.log('Reading file...')
  const file = await fs.readFile('places.json', 'utf-8')
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

async function write(data){
  return fs.writeFile('places.json', JSON.stringify(data))
}

// processData().then(addIndex).then(write).then(()=>console.log("File modified"))
