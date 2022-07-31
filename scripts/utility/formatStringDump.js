const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

// change relativePath and idPrefix to run on different files
const relativePath = '../../textFilesToBeConverted/launchTitles/nintendo64DDLaunchTitles.json';
const idPrefix = 'n64ddlt';

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const newData = fileUtil.stringArrToObjectArr(parsed, 'Nintendo 64DD launch title', idPrefix);
  const result = await fileUtil.writeFile(relativePath, newData);
  if (result) {
    console.log(chalk.cyan.bold('All IDs written!'));
  } else {
    console.log(chalk.red.bold('ERROR WRITING IDS!!'));
  }
})();
