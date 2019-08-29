const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');
const _uniqBy = require('lodash/uniqBy');

const siteUrl = 'https://en.wikipedia.org/wiki/List_of_banned_video_games#United_States';
const filePath = '../../textFilesToBeConverted/special/bannedInternationally.json';
const tablesData = [
  'Argentina',
  'Brazil',
  'China',
  'Germany',
  'India',
  'Kenya',
  'Nepal',
  'New Zealand',
  'North Korea',
  'Pakistan',
  'Suadia Arabia',
  'Singapore',
  'South Korea',
  'UAE',
  'United Kingdom'
];

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
    const tables = $('.wikitable');
    $(tables).each((index, table) => {
      const rows = $(table).find('tr');
      $(rows).each((i, row) => {
        const cells = Array.from($(row).find('td'));
        if (cells && cells.length) {
          const iText = $(cells[0])
            .find('i')
            .text();
          const detailText = $(cells[1]).text();
          // make double quotes into single, remove escapes, remove new lines, remove wiki's square bracket notations
          const cleaned = detailText.replace(/\"/g, '\'').replace(/\\/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/[[\]]/g, '');
          data.push({
            name: iText ? iText : $(cells[0]).text(),
            details: `banned in ${tablesData[index]}: ${cleaned}`
          });
        }
      });
    });
    const names = _uniqBy(data.map(item => {
      return { name: item.name, details: [] };
    }), 'name');
    const namesNames = names.map(n => n.name);
    data.forEach(item => {
      const ind = namesNames.indexOf(item.name);
      names[ind].details.push(item.details);
    });
    // console.log('data', data);
    fileUtil.writeFile(filePath, names);
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
