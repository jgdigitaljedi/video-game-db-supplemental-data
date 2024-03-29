const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const cheerio = require('cheerio');
const request = require('request');
const { whitespaceRemoveBreaks } = require('stringman-utils');

const siteUrl =
  'https://consolemods.org/wiki/Game_Gear:List_of_Game_Gear_Games_with_Save_Batteries';
const filePath = '../../textFilesToBeConverted/special/segaGameGearGamesWithSaveBattery.json';

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

function getDisplayModes(ntsc480p, pal60, ws) {
  const modes = [];
  if (ntsc480p.toLowerCase() === 'yes') {
    modes.push('NTSC 480p');
  }
  if (pal60.toLowerCase() === 'yes') {
    modes.push('PAL 60');
  }
  if (ws.toLowerCase() === 'yes') {
    modes.push('Widescreen');
  }
  return modes.join('/');
}

function getNotesStr(notes, detailsInfo) {
  if (notes && detailsInfo) {
    return ` (${notes})`;
  }
  if (notes) {
    return ` ${notes}`;
  }
  return '';
}

(function() {
  makeRequest(siteUrl)
    .then(html => {
      try {
        const $ = cheerio.load(html);
        const rows = Array.from($('table.wikitable > tbody > tr'));
        const data = rows
          .map((row, index) => {
            if (index === 0) {
              return null;
            }
            const cells = Array.from($(row).find('td'));
            // const name = $(row)
            //   .find('th')
            //   .text()
            //   .trim();
            const name = $(cells[0])
              // .first('a')
              .text()
              .trim();
            const batteryType = $(cells[1])
              // .first('a')
              .text()
              .trim();
            // const severity = $(cells[2])
            //   // .first('a')
            //   .text()
            //   .trim();
            // const notes = whitespaceRemoveBreaks(
            //   $(cells[3])
            //     .text()
            //     .trim()
            // );
            // const detailsInfo = getDisplayModes(ntsc480p, pal60, ws);
            const detailsInfo =
              !!batteryType && batteryType.trim() !== '?' ? ` (${batteryType})` : '';
            const details = `Sega Game Gear cartridge has save battery${detailsInfo}`;
            return {
              name,
              id: `ggsb${index + 1}`,
              details,
              igdbId: null,
              gbId: null,
              gbGuid: null,
              tgdbId: null,
              category: 'other'
            };
          })
          .filter(game => !!game && !!game.name);
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
