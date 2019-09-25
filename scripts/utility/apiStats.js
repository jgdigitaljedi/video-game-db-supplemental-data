// checks completed files to see what data points are missing
const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const fs = require('fs');
const path = require('path');

const masterList = '../../server/static/fileInfoList.json';
let igdb = 0;
let tgdb = 0;
let gb = 0;
let total = 0;

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
        if (!item.igdbId) {
          igdb++;
        }
        if (!item.tgdbId) {
          tgdb++;
        }
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
  console.log(chalk.green.bold(`IGDB: ${igdb}`));
  console.log(chalk.yellow.bold(`TheGamesDB: ${tgdb}`));
  console.log(chalk.magenta.bold(`Giantbomb: ${gb}`));
  const rm = await fileUtil.readFile('../../readme.md');
  const statsRemoved = rm.split('\n');
  statsRemoved.splice(-6, 6);
  const modified = `${statsRemoved.join(
    '\n'
  )}\nOut of ${total} data points collected so far, the APIs are missing data the following number of items:\n\n- IGDB: ${igdb}\n- TheGamesDB: ${tgdb}\n- Giantbomb: ${gb}\n`;
  fs.writeFile(path.join(__dirname, '../../readme.md'), modified, error => {
    if (error) {
      console.log(chalk.red.bold(`ERROR WRITING TO README: ${error}`));
    } else {
      console.log(chalk.cyan.bold('Wrote stats to readme.md!'));
    }
  });
})();
