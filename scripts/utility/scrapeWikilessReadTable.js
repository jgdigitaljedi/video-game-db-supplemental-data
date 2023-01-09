const chalk = require('chalk');
const cheerio = require('cheerio');
const request = require('request');
const fileUtil = require('./fileUtilities');
const categories = require('./helpers').categories;

/** variables specific to each list */
const siteUrl = 'https://wikiless.org/wiki/List_of_Xbox_network_games?lang=en';
const filePath = '../../textFilesToBeConverted/special/microsoftXboxSystemLinkGames.json';
const idPrefix = 'xbsl';
const details = 'Microsoft Xbox System Link game';
const conditional = true;
const category = categories.multiplayer;
/** end variables; make sure to set these */

const final = [];

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

function makeEntry(gameTitle, idPrefix, index) {
  return {
    name: gameTitle,
    details: [details],
    id: `${idPrefix}${index}`,
    igdbId: null,
    gbId: null,
    gbGuid: null,
    tgdbId: null,
    category
  };
}

(function() {
  makeRequest(siteUrl).then(html => {
    const $ = cheerio.load(html);
    const rows = $('table.wikitable.sortable tbody tr');
    $(rows).each((index, row) => {
      if (index === 0) {
        return;
      }
      const cells = Array.from($(row).find('td'));
      const gameTitle = $(cells[0])
        .find('a')
        // .find('td a')
        .text();
      console.log(gameTitle);
      if (gameTitle) {
        if (conditional) {
          /** this is where to add conditional logic before adding to list */
          if (
            cells &&
            cells.length &&
            $(cells[4])
              .text()
              .toLowerCase()
              .indexOf('system link') >= 0
          ) {
            final.push(makeEntry(gameTitle, idPrefix, index));
          }
          /** end of conditional section */
        } else {
          final.push(makeEntry(gameTitle, idPrefix, index));
        }
      }
    });
    fileUtil.writeFile(filePath, final);
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
