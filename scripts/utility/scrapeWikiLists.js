const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');

const siteUrl = 'https://en.wikipedia.org/wiki/Category:Backward-compatible_video_game_consoles';
const filePath =
  '../../textFilesToBeConverted/backwardCompatibility/backwardCompatibleConsoles.json';
const platform = '';
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

(function() {
  makeRequest(siteUrl).then(html => {
    const $ = cheerio.load(html);
    const data = [];
    const items = $('.mw-category-group ul li a');
    $(items).each((index, item) => {
      console.log('this', $(item).text());
      data.push({ name: $(item).text(), details: `${platform} backward compatible ` });
    });
    fileUtil.writeFile(filePath, data);
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
