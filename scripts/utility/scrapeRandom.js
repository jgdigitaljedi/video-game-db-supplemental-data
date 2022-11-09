const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');

const siteUrl = 'https://www.nintendo64ever.com/Nintendo-64-4-players-Games.html';
const filePath = '../../textFilesToBeConverted/multiplayer/n64_4playerGames.json';
const idPrefix = 'n644p'

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
    const list = $('table.liste-jeux')[0];
    const rows = $(list).find('tr');
    const removedHeadings = Array.from(rows).filter(item => $(item).find('td').length > 1);
    $(removedHeadings).each((index, item) => {
      const gameCell = $(item).find('td')[0];
      const game = $(gameCell).text();
      data.push({
        name: game,
        id: `${idPrefix}${index}`,
        details: 'N64 4 player game',
        igdbId: null,
        gbId: null,
        tgdbId: null
      })
    });
    fileUtil.writeFile(filePath, data);
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
