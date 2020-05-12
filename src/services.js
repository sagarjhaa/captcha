const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '5387ffaf015e40f6a12d782172f88fa9'});

var cache = {};

async function checkImage(url) {
  if (cache[url] === undefined) {
    
    var response = await app.models.initModel({ id: 'bd367be194cf45149e75f01d59f77ba7' })
                          .then(generalModel => { return generalModel.predict(url); })
                          .catch(e => alert('Sorry an error occured!!'));

    var concepts = response['outputs'][0]['data']['concepts']
    var a = concepts.filter(i => i.name === 'pie');
    if (a.length > 0) {
      cache[url] = true;
    }
    else {
      cache[url] = false;
    }
    return cache[url];
  }
  else {
    console.log('responding from cache');
    return cache[url];
  }
}


export {checkImage};

