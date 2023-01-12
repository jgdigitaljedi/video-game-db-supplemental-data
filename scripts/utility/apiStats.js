// checks completed files to see what data points are missing
const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const fs = require('fs');
const path = require('path');
const platformStats = require('./updateAllLists/platformDataStats.json');
const generateFilesList = require('./createListOfFileNames');

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
        if (!item.igdbId && !item.gbId) {
          allThree++;
        }
        if (!item.igdbId) {
          igdb++;
        }
        // if (!item.tgdbId) {
        //   tgdb++;
        // }
        if (!item.gbId) {
          gb++;
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

  await generateFilesList();

  // console data
  const totalPlatDataPoints = Object.values(platformStats).reduce((acc, obj) => {
    acc += obj;
    return acc;
  }, 0);

  console.log(
    chalk.magenta.bold(`There are ${totalPlatDataPoints} data points for platforms/consoles.`)
  );

  // game data
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
  // const tgdbPer = getPercentage(tgdb, total);
  const gbPer = getPercentage(gb, total);
  const totalPer = getPercentage(allThree, total);

  console.log(chalk.cyan.bold(`Missing from all: ${allThree} (${totalPer}%)`));
  console.log(chalk.green.bold(`IGDB: ${igdb} (${igdbPer}%)`));
  // console.log(chalk.yellow.bold(`TheGamesDB: ${tgdb} (${tgdbPer}%)`));
  console.log(chalk.magenta.bold(`Giantbomb: ${gb} (${gbPer}%)`));
  const rm = await fileUtil.readFile('../../readme.md');
  const statsRemoved = rm.split('\n');
  statsRemoved.splice(-7, 7);
  const modified = `${statsRemoved.join(
    '\n'
  )}\nThere are ${totalPlatDataPoints} data points for platforms/consoles.\n Out of ${total} games data points collected so far, the APIs are missing data the following number of games:\n\n- Missing from all APIs: ${allThree} (${totalPer}%)\n- IGDB: ${igdb} (${igdbPer}%)\n- Giantbomb: ${gb} (${gbPer}%)\n`;
  fs.writeFile(path.join(__dirname, '../../readme.md'), modified, error => {
    if (error) {
      console.log(chalk.red.bold(`ERROR WRITING TO README: ${error}`));
    } else {
      console.log(chalk.cyan.bold('Wrote stats to readme.md!'));
    }
  });
})();
