const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

// change relativePath and idPrefix to run on different files
const relativePath = '../../textFilesToBeConverted/launchTitles/neoGeoAesLaunchTitles.json';
const idPrefix = 'ngalt';

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const newData = fileUtil.stringArrToObjectArr(parsed, 'Neo Geo AES launch title', idPrefix);
  const result = await fileUtil.writeFile(relativePath, newData);
  if (result) {
    console.log(chalk.cyan.bold('All IDs written!'));
  } else {
    console.log(chalk.red.bold('ERROR WRITING IDS!!'));
  }
})();
