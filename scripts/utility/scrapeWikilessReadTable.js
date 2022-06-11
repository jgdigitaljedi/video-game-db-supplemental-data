const chalk = require('chalk');
const cheerio = require('cheerio');
const request = require('request');
const fileUtil = require('./fileUtilities');

const siteUrl = 'https://wikiless.org/wiki/List_of_Neo_Geo_Pocket_Color_games?lang=en';
const filePath = '../../textFilesToBeConverted/backwardCompatibility/ngpcToNgp.json';

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
    const rows = $('#softwarelist tr');
    $(rows).each((index, row) => {
      if (index === 0) {
        return;
      }
      const gameTitle = $(row)
        .find('th i a')
        .text();
      const cells = $(row).find('td');
      const yesNoCell = $(cells)[2];
      if (yesNoCell) {
        const yesNo = yesNoCell.attribs.class;
        console.log('yesNo', yesNo);
        if (yesNo && yesNo === 'table-yes') {
          final.push(gameTitle);
        }
      }
    });
    fileUtil.writeFile(filePath, final);
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
