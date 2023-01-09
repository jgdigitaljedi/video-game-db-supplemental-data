const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');
const { categories } = require('./helpers');
const whitespaceRemoveBreaks = require('stringman-utils').whitespaceRemoveBreaks;

const siteUrl = 'https://nintendo.fandom.com/wiki/List_of_Famicom-Exclusive_games';
const filePath = '../../textFilesToBeConverted/platformExclusives/nintendoFamicomExclusives.json';
const platform = 'Nintendo Famicom';
const idPrefix = 'nfcex';
const digitalText = '';
const category = categories.exclusive;

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
    const items = $('table tbody tr');
    // const items = $('table tr td ul li i a');
    $(items).each((index, item) => {
      // console.log('this', $(item).text());
      const cell = $(item).find('td')[0];
      const text = !!$(cell)
        .find('a')
        .attr('title')
        ? $(cell)
            .find('a')
            .attr('title')
        : $(cell).text();
      data.push({
        name: whitespaceRemoveBreaks(text),
        details: `${platform} exclusive game`,
        id: `${idPrefix}${index + 1}`,
        igdbId: null,
        gbId: null,
        gbGuid: null,
        tgdbId: null,
        category
      });
    });
    fileUtil.writeFile(filePath, data);
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
