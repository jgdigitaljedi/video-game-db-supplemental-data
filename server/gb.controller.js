const express = require('express');
const router = express.Router();
const gbKey = process.env.JGBKEY;
const axios = require('axios');

router.post('/gamelookup', async (req, res) => {
  try {
    let url;
    if (req.body.name) {
      const { name, platform } = req.body;
      if (platform) {
        url = `https://api.giantbomb.com/games/?api_key=${gbKey}&filter=name:${name},platforms:${platform}&format=json`;
      } else {
        url = `https://api.giantbomb.com/games/?api_key=${gbKey}&filter=name:${name}&format=json`;
      }
      axios
        .get(url)
        .then(result => {
          if (result && result.data && result.data.results) {
            try {
              const cleaned = result.data.results.map(item => {
                item.gbid = item.id;
                return {
                  gbId: item.id,
                  gbGuid: item.guid
                };
              });
              res.json(cleaned);
            } catch (err) {
              res
                .status(500)
                .json({ error: true, message: 'ERROR LOOKING UP GAME ON GIANTBOMB!', code: error });
            }
          } else {
            res.json(result);
          }
        })
        .catch(error => {
          res
            .status(500)
            .json({ error: true, message: 'ERROR LOOKING UP GAME ON GIANTBOMB!', code: error });
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: 'ERROR LOOKING UP GAME ON GIANTBOMB!', code: error });
  }
});

router.post('/platformlookup', async (req, res) => {
  if (req.body.name) {
    try {
      const urlName = encodeURI(req.body.name);
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
            res.status(200).json(cleaned);
          } catch (error) {
            res.status(500).json({ error: true, message: `UNKNOWN ERROR WITH GB: ${error}` });
          }
        })
        .catch(error => {
          console.log('gb platform error', error);
          res.status(500).send(error);
        });
    } catch (error) {
      res
        .status(500)
        .json({ error: true, message: 'ERROR SEARCHING GIANTBOMB PLATFORMS!', code: error });
    }
  } else {
    res.status(400).json({ error: true, message: 'YOU MUST SEND A PLATFORM NAME IN THE REQUEST!' });
  }
});

module.exports = router;
