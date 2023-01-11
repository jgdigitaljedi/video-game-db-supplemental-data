const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const { categories } = require('./helpers');

// change relativePath and idPrefix to run on different files
const relativePath = '../../textFilesToBeConverted/special/segaSaturnVcdCardGames.json';
const idPrefix = 'ssvc';
const category = categories.peripheral;

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const newData = fileUtil.incrementIds(parsed, idPrefix);
  const missing = newData.map(item => {
    if (!item.hasOwnProperty('igdbId')) {
      item.igdbId = null;
    }
    if (!item.hasOwnProperty('gbId')) {
      item.gbId = null;
    }
    if (!item.hasOwnProperty('gbGuid')) {
      item.gbGuid = null;
    }
    if (!item.hasOwnProperty('tgdbId')) {
      item.tgdbId = null;
    }
    if (!item.hasOwnProperty('category')) {
      item.category = category;
    }
    return item;
  });
  const result = await fileUtil.writeFile(relativePath, missing);
  if (result) {
    console.log(chalk.cyan.bold('All IDs written!'));
  } else {
    console.log(chalk.red.bold('ERROR WRITING IDS!!'));
  }
})();
