const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

// change relativePath and idPrefix to run on different files
const relativePath = '../../textFilesToBeConverted/special/rcaStudio2BuiltInGames.json';
const idPrefix = 'rs2bi';
const parensToDetails = false;

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const newData = fileUtil.stringArrToObjectArr(
    parsed,
    'RCA Studio II built-in game',
    idPrefix,
    parensToDetails
  );
  const result = await fileUtil.writeFile(relativePath, newData);
  if (result) {
    console.log(chalk.cyan.bold('All IDs written!'));
  } else {
    console.log(chalk.red.bold('ERROR WRITING IDS!!'));
  }
})();
