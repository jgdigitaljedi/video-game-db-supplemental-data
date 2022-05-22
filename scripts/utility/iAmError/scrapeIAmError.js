const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const typePrefixObj = {
  game: 'ge',
  platform: 'pe',
  accessory: 'ae'
};

/* change these fields for each list */
const iaeUrl = 'https://iamerror.gamehacking.org/?page=database&catID=7&sysID=35';
const itemType = 'game';
const platPrefix = 'dc';
/************************************/

const filePath = path.join(__dirname, './output.json');
const idPrefix = `${platPrefix}${typePrefixObj[itemType]}`;
const hrefPrefix = 'https://iamerror.gamehacking.org';

async function scrapeIae() {
  try {
    const html = await axios.get(iaeUrl);
    const $ = await cheerio.load(html.data);
    const data = [];
    const table = $('.table.table-bordered tr');

    $(table).each((index, elem) => {
      if (index > 0) {
        const cells = $(elem).children();
        const imageLink = $(cells[2]).find('a')[0].attribs.href;
        data.push({
          name: $(cells[0]).text(),
          id: `${idPrefix}${index}`,
          details: $(cells[3]).text(),
          image: `${hrefPrefix}${imageLink}`,
          type: $(cells[1]).text(),
          igdbId: null,
          gbId: null,
          gbGuid: null
        });
      }
    });
    return Promise.resolve(data);
  } catch (error) {
    console.log(chalk.yellow.bold('ERROR SCRAPING TABLE', error));
  }
}

(async function() {
  const data = await scrapeIae();
  fs.writeFile(filePath, JSON.stringify(data, null, 2), error => {
    if (error) {
      console.log(chalk.red.bold('ERROR SCRAPING IAMERROR', error));
    } else {
      console.log(chalk.cyan('Output file written!'));
    }
  });
})();
