const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');

const siteUrl = 'https://consolemods.org/wiki/Master_System:Game_Incompatibilites';
const filePath = '../../textFilesToBeConverted/special/masterSystemPalGamesWithProblemsOnNtsc.json';

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

function getDisplayModes(ws, p480, p720, i1080) {
  const modes = [];
  if (ws.toLowerCase() === 'yes') {
    modes.push('16:9');
  }
  if (p480.toLowerCase() === 'yes') {
    modes.push('480p');
  }
  if (p720.toLowerCase() === 'yes') {
    modes.push('720p');
  }
  if (i1080.toLowerCase() === 'yes') {
    modes.push('1080i');
  }
  return modes.join('/');
}

(function() {
  makeRequest(siteUrl)
    .then(html => {
      try {
        const $ = cheerio.load(html);
        const rows = Array.from($('table.wikitable > tbody > tr'));
        const data = rows
          .map((row, index) => {
            const cells = Array.from($(row).find('td'));
            const name = $(cells[0])
              .text()
              .trim();
            const issue = $(cells[1])
              .first('a')
              .text()
              .trim();
            const severity = $(cells[2])
              .first('a')
              .text()
              .trim();
            const details = `Sega Master System PAL game has issues on NTSC Master System: (${severity}: ${issue})`;
            return {
              name,
              id: `mspn${index + 1}`,
              details,
              igdbId: null,
              gbId: null,
              gbGuid: null,
              tgdbId: null,
              category: 'other'
            };
          })
          .filter(game => !!game.name);
        fileUtil.writeFile(filePath, data);
        console.log(chalk.cyan.bold('Scraping complete and file written!'));
      } catch (error) {
        console.log(chalk.red.bold(error));
      }
    })
    .catch(error => {
      console.log(chalk.red.bold('Request catch error', error));
    });
})();
