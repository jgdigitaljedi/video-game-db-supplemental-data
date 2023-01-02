const chalk = require('chalk');
const cheerio = require('cheerio');
const request = require('request');
const fileUtil = require('./fileUtilities');

const siteUrl = 'https://wikiless.org/wiki/List_of_PlayStation_2_online_games?lang=en';
const filePath = '../../textFilesToBeConverted/special/playstation2OnlineGames.json';
const idPrefix = 'ps2ol';

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

(function() {
  makeRequest(siteUrl).then(html => {
    const $ = cheerio.load(html);
    const rows = $('table.wikitable.sortable tbody tr');
    $(rows).each((index, row) => {
      if (index === 0) {
        return;
      }
      const gameTitle = $(row)
        .find('td a')
        .text();
      console.log(gameTitle);
      if (gameTitle) {
        final.push({
          name: gameTitle,
          id: `${idPrefix}${index}`,
          igdbId: null,
          gbId: null,
          gbGuid: '',
          tgdbId: null
        });
      }
      // const cells = $(row).find('td');
      // const yesNoCell = $(cells)[2];
      // if (yesNoCell) {
      //   const yesNo = yesNoCell.attribs.class;
      //   console.log('yesNo', yesNo);
      //   if (yesNo && yesNo === 'table-yes') {
      //     final.push(gameTitle);
      //   }
      // }
    });
    fileUtil.writeFile(filePath, final);
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
