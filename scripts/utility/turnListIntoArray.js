const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

const inFilePath = '../../textFilesToBeConverted/multiplayer/sonyPlaystationLinkCableGames.txt';
const outFilePath = '../../textFilesToBeConverted/multiplayer/sonyPlaystationLinkCableGames.json';

(function() {
  try {
    const rawFile = fileUtil.readFile(inFilePath);
    const parsed = rawFile
      .split('\n')
      .filter(i => !!i)
      .map(i => i.replace(/ *\[[^\]]*]/, ''));
    fileUtil.writeFile(outFilePath, parsed);
    console.log(chalk.green('New JSON file written!'));
  } catch (err) {
    console.log(chalk.red.bold('An error occurred:', err));
  }
})();
