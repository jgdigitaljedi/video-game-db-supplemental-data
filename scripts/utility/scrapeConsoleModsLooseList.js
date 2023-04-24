const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');
const whitespaceReplaceWith = require('stringman-utils').whitespaceReplaceWith;

const siteUrl = 'https://consolemods.org/wiki/Dreamcast:VMU_Games_List';
const filePath = '../../textFilesToBeConverted/special/dreamcastGamesWithVmuFeatures.json';

const detailsHeaders = ['In-game features', 'VMU minigame'];

/** note that this script requires some manual cleanup afterward.
 * - there is no strict format used on the site
 * - it seemed like a little manual cleanup would take less time than writing the code to make everything perfect
 */

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

function getGameDetails($, game, details) {
  if (game && $(game).next() && $(game).next()[0] && $(game).next()[0].name !== 'h4') {
    const next = $(game).next();
    const data = $(next)
      .text()
      .trim();
    if (!!data) {
      details.push(data);
    }
    if ($(next) && $(next)[0] && $(next)[0].next && $(next)[0].next.type !== 'h4') {
      return getGameDetails($, $($(next)[0].next), details);
    } else {
      return details;
    }
  } else {
    return details;
  }
}

function formatDetails(detailsArr) {
  const puncArr = detailsArr.map((detail, index) => {
    if (detailsHeaders.indexOf(detail) >= 0) {
      if (index > 0) {
        return `) (${detail}:`;
      }
      return `(${detail}:`;
    }
    if ((index = detailsArr.length - 1)) {
      return `${detail})`;
    }
    return `${detail},`;
  });
  return whitespaceReplaceWith(puncArr.join(' '), { breaks: true }, ', ', true);
}

(function() {
  const final = [];
  makeRequest(siteUrl)
    .then(html => {
      try {
        const $ = cheerio.load(html);
        const titles = Array.from($('h4'));
        for (let i = 0; i < titles.length; i++) {
          const self = titles[i];
          const title = $(self).text();
          const details = getGameDetails($, self, []);
          console.log('details', details);
          final.push({
            name: title,
            id: `dcvmu${i + 1}`,
            details: `Dreamcast game has VMU features: ${formatDetails(details)}`,
            igdbId: null,
            gbId: null,
            gbGuid: null,
            tgdbId: null,
            category: 'other'
          });
        }
        fileUtil.writeFile(filePath, final);
        console.log(chalk.cyan.bold('Scraping complete and file written!'));
      } catch (error) {
        console.log(chalk.red.bold(error));
      }
    })
    .catch(error => {
      console.log(chalk.red.bold('Request catch error', error));
    });
})();
