const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

// change relativePath and idPrefix to run on different files
const relativePath = '../../textFilesToBeConverted/backwardCompatibility/ngpcToNgp.json';
const idPrefix = 'ngpcbc';

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const newData = fileUtil.stringArrToObjectArr(
    parsed,
    'Neo Geo Pocket Color game backward compatible with Neo Geo Pocket',
    idPrefix
  );
  const result = await fileUtil.writeFile(relativePath, newData);
  if (result) {
    console.log(chalk.cyan.bold('All IDs written!'));
  } else {
    console.log(chalk.red.bold('ERROR WRITING IDS!!'));
  }
})();
