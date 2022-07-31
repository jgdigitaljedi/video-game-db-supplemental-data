const igdbController = require('../../../server/igdb.controller');
const gbController = require('../../../server/gb.controller');
const gbKey = process.env.JGBKEY;
const axios = require('axios');

const pName = 'nintendo 64';

const searchIgdbPlatform = async () => {
  try {
    const result = await igdbController.igdbPlatformSearch(pName);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.resolve({ error: true, message: error });
  }
};

const searchGbPlatform = async () => {
  const urlName = encodeURI(pName);
  axios
    .get(
      `https://www.giantbomb.com/api/platforms/?api_key=${gbKey}&filter=name:${urlName}&format=json`
    )
    .then(result => {
      try {
        const cleaned = result.data.results.map(item => {
          return {
            gbId: item.id,
            gbGuid: item.guid,
            name: item.name
          };
        });
        console.log('gb results cleaned', cleaned);
        return Promise.resolve(cleaned);
      } catch (error) {
        return Promise.resolve({ error: true, message: `UNKNOWN ERROR WITH GB: ${error}` });
      }
    })
    .catch(error => {
      console.log('gb platform error', error);
      return Promise.resolve({ error: true, message: error });
    });
};

(async function() {
  const igdbResult = await searchIgdbPlatform();
  console.log('igdbResult', igdbResult);
  const gbResult = await searchGbPlatform();
  // const gbShort = gbResult.data.results.map(r => {
  //   delete r.description;
  //   return r;
  // });
  // console.log('gbResult', gbResult);
})();
