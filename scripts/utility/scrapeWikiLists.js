const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');

const siteUrl = 'https://en.wikipedia.org/wiki/Category:Sega_Game_Gear-only_games';
const filePath = '../../textFilesToBeConverted/platformExclusives/segaGameGearExclusives.json';
const platform = 'Sega Game Gear';
const digitalText = '';

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

(function () {
  makeRequest(siteUrl).then(html => {
    const $ = cheerio.load(html);
    const data = [];
    const items = $('.mw-category-group ul li a');
    $(items).each((index, item) => {
      console.log('this', $(item).text());
      data.push({ name: $(item).text(), details: `${platform} exclusive` });
    });
    fileUtil.writeFile(filePath, data);
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
