const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

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
})();
