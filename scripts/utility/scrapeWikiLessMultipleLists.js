const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');
const _flatten = require('lodash/flatten');

const siteUrl = 'https://wikiless.org/wiki/PlayStation_Multitap?lang=en';
const filePath = '../../textFilesToBeConverted/multiplayer/playstation2multitap.json';
const platform = 'PlayStation 2';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, html) => {
      if (err) {
        reject({ error: true, code: err });
      } else {
        resolve(html);
      }
    });
  });
}

(function() {
  makeRequest(siteUrl).then(html => {
    const $ = cheerio.load(html);
    let currentId = 1;
    const rawLists = $('ul');
    const four = rawLists[6];
    const five = rawLists[7];
    const six = rawLists[8];
    const eight = rawLists[9];
    const items = [
      {
        extra: '(1 - 4 players)',
        list: four
      },
      {
        extra: '(1 - 5 players)',
        list: five
      },
      {
        extra: '(1 - 6 players)',
        list: six
      },
      {
        extra: '(1 - 8 players)',
        list: eight
      }
    ];
    const final = items.map((item, ind) => {
      const data = [];
      $(item.list)
        .find('li')
        .each((index, game) => {
          console.log('game', $(game).text());
          data.push({
            name: $(game).text(),
            id: `ps2mt${currentId}`,
            details: `${platform} Multitap compatible game ${item.extra}`,
            igdbId: null,
            gbId: null,
            gbGuid: null
          });
          currentId++;
        });
      return data;
    });
    fileUtil.writeFile(filePath, _flatten(final));
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
