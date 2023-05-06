const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const { whitespaceRemoveTabs, whitespaceRemoveBreaks } = require('stringman-utils');

const inFilePath = '../../textFilesToBeConverted/special/genesisSegaChannelGamesOnlyInUs.txt';
const outFilePath = '../../textFilesToBeConverted/special/genesisSegaChannelGamesOnlyInUs.json';

(function() {
  try {
    const rawFile = fileUtil.readFile(inFilePath);
    const parsed = rawFile
      .split('\n')
      .filter(i => !!i)
      .map(i => whitespaceRemoveBreaks(whitespaceRemoveTabs(i.replace(/ *\[[^\]]*]/, ''))));
    fileUtil.writeFile(outFilePath, parsed);
    console.log(chalk.green('New JSON file written!'));
  } catch (err) {
    console.log(chalk.red.bold('An error occurred:', err));
  }
})();
