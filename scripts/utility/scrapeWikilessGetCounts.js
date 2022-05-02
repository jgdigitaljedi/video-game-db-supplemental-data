const chalk = require('chalk');
const cheerio = require('cheerio');
const request = require('request');

const siteUrl = 'https://wikiless.org/wiki/List_of_Nintendo_Entertainment_System_games?lang=en';

const totals = {
  na: 0,
  europe: 0
};

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

function getDataFromCell($, ele, which) {
  if ($(ele).text() === 'Unreleased') {
    return;
  }
  const cellText =
    !!$(ele)
      .find('span')
      .text() &&
    $(ele)
      .find('span')
      .text() !== 'Unreleased';
  if (cellText) {
    console.log(
      $(ele)
        .find('span')
        .text()
    );
    totals[which]++;
  }
}

(function() {
  makeRequest(siteUrl).then(html => {
    const $ = cheerio.load(html);
    const rows = $('#softwarelist tr');
    $(rows).each((index, row) => {
      const cells = $(row).find('td');
      const na = $(cells)[4];
      const europe = $(cells)[5];
      getDataFromCell($, na, 'na');
      getDataFromCell($, europe, 'europe');
    });
    console.log(chalk.cyan(`NA total: ${totals.na}`));
    console.log(chalk.magenta(`Europe total: ${totals.europe}`));
  });
})();
