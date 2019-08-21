const express = require('express');
const router = express.Router();
const axios = require('axios');
const tgdbKey = process.env.TGDBKEY;

router.post('/gamelookup', async (req, res) => {

});

router.post('/platformlookup', async (req, res) => {
  if (req.body.name) {
    try {
      const urlName = encodeURI(req.body.name);
      axios
        .get(
          `https://api.thegamesdb.net/Platforms/ByPlatformName?apikey=${tgdbKey}&name=${urlName}`
        )
        .then(result => {
          if (result && result.data && result.data.data && result.data.data.platforms) {
            const cleaned = result.data.data.platforms.map(p => {
              return {
                tgdbId: p.id,
                name: p.name
              };
            });
            res.json(cleaned);
          } else {
            res.status(500).json({ error: true, message: 'SOMETHING WENT WRONG WITH THEGAMESDB PLATFORM RESPONSE!', code: result.data });
          }
        })
        .catch(error => {
          console.log('tgdb error', error);
          res.status(500).json({ error: true, message: 'ERROR FETCHING PLATFORM FROM THEGAMESDB!', code: error });
        });
    } catch (error) {
      console.log('tgdb error in second catch', error);
      res.status(500).json({ error: true, message: 'ERROR FETCHING PLATFORM FROM THEGAMESDB!', code: error });
    }
  } else {
    res.status(400).json({ error: true, message: 'YOU MUST SEND A PLATFORM NAME TO SEARCH THEGAMESDB!' });
  }
});

module.exports = router;
