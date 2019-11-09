// checks completed files to see what data points are missing
const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const fs = require('fs');
const path = require('path');

const masterList = '../../server/static/fileInfoList.json';
let igdb = 0;
let tgdb = 0;
let gb = 0;
let allThree = 0;
let total = 0;

function getPercentage(num, sum) {
  return Math.round((num / sum) * 100);
}

async function checkFileForApiInfo(file) {
  return new Promise((resolve, reject) => {
    let fContents;
    try {
      if (file.filePath.indexOf('static') >= 0) {
        fContents = fileUtil.readFile(`../../server/${file.filePath}`);
      } else {
        fContents = fileUtil.readFile(`../${file.filePath}`);
      }
    } catch (err) {
      fContents = null;
      console.log(chalk.red.bold(`Could not read ${file.filePath}`));
    }
    const fParsed = fContents ? JSON.parse(fContents) : null;
    if (fParsed) {
      fParsed.forEach(item => {
        if (!item.igdbId && !item.gbId && !item.tgdbId) {
          allThree++;
        } else {
          if (!item.igdbId) {
            igdb++;
          }
          if (!item.tgdbId) {
            tgdb++;
          }
          if (!item.gbId) {
            gb++;
          }
        }
        total++;
      });
    }
    resolve(true);
  });
}

(async function() {
  const master = await fileUtil.readFile(masterList);
  const pMaster = JSON.parse(master);

  for (const file of pMaster) {
    if (file.complete) {
      const done = await checkFileForApiInfo(file);
    }
  }
  console.log(
    chalk.cyan.bold(
      `Out of ${total} items the APIs are missing data the following number of items:`
    )
  );

  const igdbPer = getPercentage(igdb, total);
  const tgdbPer = getPercentage(tgdb, total);
  const gbPer = getPercentage(gb, total);
  const totalPer = getPercentage(allThree, total);

  console.log(chalk.cyan.bold(`Missing from all: ${allThree} (${totalPer}%)`));
  console.log(chalk.green.bold(`IGDB: ${igdb} (${igdbPer}%)`));
  console.log(chalk.yellow.bold(`TheGamesDB: ${tgdb} (${tgdbPer}%)`));
  console.log(chalk.magenta.bold(`Giantbomb: ${gb} (${gbPer}%)`));
  const rm = await fileUtil.readFile('../../readme.md');
  const statsRemoved = rm.split('\n');
  statsRemoved.splice(-6, 6);
  const modified = `${statsRemoved.join(
    '\n'
  )}\nOut of ${total} data points collected so far, the APIs are missing data the following number of items:\n\n- Missing from all APIs: ${allThree} (${totalPer}%)\n- IGDB: ${igdb} (${igdbPer}%)\n- Giantbomb: ${gb} (${gbPer}%)\n`;
  fs.writeFile(path.join(__dirname, '../../readme.md'), modified, error => {
    if (error) {
      console.log(chalk.red.bold(`ERROR WRITING TO README: ${error}`));
    } else {
      console.log(chalk.cyan.bold('Wrote stats to readme.md!'));
    }
  });
})();
