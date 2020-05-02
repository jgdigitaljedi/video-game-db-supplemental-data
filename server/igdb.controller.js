const express = require('express');
const router = express.Router();
const apicalypse = require('apicalypse').default;
const moment = require('moment');
const _cloneDeep = require('lodash/cloneDeep');

/* IGDB Search */

const esrbData = {
  '6': 'RP',
  '7': 'EC',
  '8': 'E',
  '9': 'E10+',
  '10': 'T',
  '11': 'M',
  '12': 'AO'
};

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

const fullGameQueryString =
  'age_ratings.rating,total_rating,total_rating_count,first_release_date,genres.name,name';

function parseFullDataResult(data) {
  return data.map(item => {
    if (item.first_release_date) {
      const rDate = item.first_release_date;
      item.first_release_date = moment(parseInt(`${rDate}000`)).format('MM/DD/YYYY');
    }
    if (item.total_rating) {
      const trCopy = item.total_rating.toFixed();
      item.total_rating = parseInt(trCopy);
    }
    item.esrb = { rating: null, letterRating: null };
    if (item.age_ratings && item.age_ratings.length) {
      const esrb = item.age_ratings.filter(r => r.rating > 5).map(r => r.rating);
      item.esrb.rating = esrb[0];
      item.esrb.letterRating = esrbData && esrb && esrb.length ? esrbData[esrb[0].toString()] : '';
    }
    const gCopy = _cloneDeep(item.genres);
    const gCleaned = gCopy && gCopy.length ? gCopy.map(g => g.name) : null;
    item.genres = gCleaned;
    return item;
  });
}

function apiFullSearch(name, platform) {
  const request = apicalypse(requestOptions)
    .fields(fullGameQueryString)
    .search(name)
    .where(`platforms = [${platform}]`)
    .request('/games');

  return new Promise((resolve, reject) => {
    request
      .then(result => {
        resolve({ data: parseFullDataResult(result.data) });
      })
      .catch(error => {
        console.log('error', error.response);
        reject(error);
      });
  });
}

function apiSearch(name, platform) {
  return apicalypse(requestOptions)
    .fields(`name,id`)
    .search(name)
    .where(`platforms = [${platform}]`)
    .request('/games');
}

function fuzzyFullApiSearch(name) {
  const request = apicalypse(requestOptions)
    .fields(fullGameQueryString)
    .search(name)
    .request('/games');

  return new Promise((resolve, reject) => {
    request
      .then(result => {
        resolve({ data: parseFullDataResult(result.data) });
      })
      .catch(error => {
        console.log('error', error.response);
        reject(error);
      });
  });
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
    const apiResults = req.body.fullData
      ? await apiFullSearch(req.body.name, platform)
      : await apiSearch(req.body.name, platform);
    const data = apiResults.data;
    console.log('data', data);
    res.json(data);
  } else {
    res.status(500).json({ error: true, message: 'You must send a name and a platform!' });
  }
});

router.post('/gamefuzzy', async (req, res) => {
  if (req.body.name) {
    const apiResults = req.body.fullData
      ? await fuzzyFullApiSearch(req.body.name)
      : await fuzzyApiSearch(req.body.name);
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
