const express = require('express');
const router = express.Router();
const apicalypse = require('apicalypse').default;

/* IGDB Search */

const requestOptions = {
  method: 'POST',
  baseURL: 'https://api-v3.igdb.com',
  headers: {
    Accept: 'application/json',
    'user-key': process.env.IGDBV3KEY
  }
};

const platformOptions = {
  method: 'POST',
  baseURL: 'https://api-v3.igdb.com',
  headers: {
    Accept: 'application/json',
    'user-key': process.env.IGDBV3KEY
  }
};

function apiSearch(name, platform) {
  return apicalypse(requestOptions)
    .fields(`name,id`)
    .search(name)
    .where(`platforms = [${platform}]`)
    .request('/games');
}

function fuzzyApiSearch(name) {
  return apicalypse(requestOptions)
    .fields(`name,id`)
    .search(name)
    .request('/games');
}

function platformSearch(platform) {
  return apicalypse(platformOptions)
    .fields(`name,id`)
    .search(platform)
    .request('/platforms');
}

router.post('/gamelookup', async (req, res) => {
  if (req.body.name && req.body.platform) {
    const platform = req.body.platform;
    const apiResults = await apiSearch(req.body.name, platform);
    const data = apiResults.data;
    res.json(data);
  } else {
    res.status(500).json({ error: true, message: 'You must send a name and a platform!' });
  }
});

router.post('/gamefuzzy', async (req, res) => {
  if (req.body.name) {
    const apiResults = await fuzzyApiSearch(req.body.name);
    const data = apiResults.data;
    res.json(data);
  } else {
    res.status(500).json({ error: true, message: 'You must send a name!' });
  }
});

router.post('/platform', async (req, res) => {
  try {
    if (req.body.name) {
      const pResult = await platformSearch(req.body.name);
      res.json(pResult.data);
    } else {
      res.status(400).json({
        error: true,
        message: 'YOU HAVE TO SEND A PLATFORM NAME TO SEARCH IGDB FOR PLATFORMS!'
      });
    }
  } catch (error) {
    console.log('igdb platform error', error);
    res
      .status(500)
      .json({ error: true, message: 'ERROR SEARCHING IGDB FOR PLATFORMS!', code: error });
  }
});

module.exports = router;
