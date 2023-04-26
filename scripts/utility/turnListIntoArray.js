const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

const inFilePath = '../../textFilesToBeConverted/special/snesGamesWithSaveBatteries.txt';
const outFilePath = '../../textFilesToBeConverted/special/snesGamesWithSaveBatteries.json';

(function() {
  try {
    const rawFile = fileUtil.readFile(inFilePath);
    const parsed = rawFile.split('\n').filter(i => !!i);
    fileUtil.writeFile(outFilePath, parsed);
    console.log(chalk.green('New JSON file written!'));
  } catch (err) {
    console.log(chalk.red.bold('An error occurred:', err));
  }
})();
