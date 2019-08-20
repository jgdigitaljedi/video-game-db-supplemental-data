const express = require('express');
const router = express.Router();
const gbKey = process.env.JGGBKEY;

router.post('/gamelookup', async (req, res) => {
  try {
    let url;
    if (req.body.game) {
      const { game, platform } = req.body;
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
                return item;
              });
              res.json(cleaned);
            } catch (err) {
              res.status(500).json({ error: true, message: 'ERROR LOOKING UP GAME ON GIANTBOMB!', code: error });
              return err;
            }
          } else {
            res.json(result);
          }
        })
        .catch(error => {
          res.status(500).json({ error: true, message: 'ERROR LOOKING UP GAME ON GIANTBOMB!', code: error });
        });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: 'ERROR LOOKING UP GAME ON GIANTBOMB!', code: error });
  }
});

module.exports = router;
