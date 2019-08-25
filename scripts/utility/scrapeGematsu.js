const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');

const siteUrl = 'https://gematsu.com/exclusives/ps-vita';
const filePath = '../../textFilesToBeConverted/platformExclusives/sonyPlaystationVita.json';
const platform = 'Sony PlayStation Vita';
const digitalText = 'PlayStation Network';

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
    // const list = $('.jl_table_list')[0]; // from released table; inddex of 0 for consoles without 'upcoming' table at top
    const list = $('.jl_table_list')[1]; //  change index to 1 for consoles with upcoming tables.
    const halves = $(list).find('td');
    const physical = $(halves[0]).find('li');
    const digital = $(halves[1]).find('li');
    $(physical).each((index, item) => {
      const text = $(item)
        .find('span')
        .text();
      if ($(item).hasClass('fullexclusive')) {
        data.push({ name: text, details: `${platform} full exclusive` });
      } else if ($(item).hasClass('platformexclusive')) {
        data.push({ name: text, details: `${platform} platform exclusive` });
      } else if ($(item).hasClass('consoleexclusive')) {
        data.push({ name: text, details: `${platform} console exclusive` });
      }
    });
    $(digital).each((index, item) => {
      const text = $(item)
        .find('span')
        .text();
      if ($(item).hasClass('fullexclusive')) {
        data.push({
          name: text,
          details: `${platform} full exclusive (${digitalText})`
        });
      } else if ($(item).hasClass('platformexclusive')) {
        data.push({
          name: text,
          details: `${platform} platform exclusive (${digitalText})`
        });
      } else if ($(item).hasClass('consoleexclusive')) {
        data.push({
          name: text,
          details: `${platform} console exclusive (${digitalText})`
        });
      }
    });
    fileUtil.writeFile(filePath, data);
    console.log(chalk.cyan.bold('Scraping complete and file written!'));
  });
})();
