const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
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

function getPlatform(str) {
  if (str === 'Xb360ToXbOne') {
    return 12;
  }
  return 11;
}

router.post('/search', async (req, res) => {
  if (req.body.name && req.body.platform) {
    const platform = getPlatform(req.body.platform);
    const apiResults = await apiSearch(req.body.name, platform);
    const data = apiResults.data;
    res.json(data);
  } else {
    res.status(500).json({ error: true, message: 'You must send a name and a platform!' });
  }
});

router.post('/fuzzy', async (req, res) => {
  if (req.body.name) {
    const apiResults = await fuzzyApiSearch(req.body.name);
    const data = apiResults.data;
    res.json(data);
  } else {
    res.status(500).json({ error: true, message: 'You must send a name!' });
  }
});

module.exports = router;
