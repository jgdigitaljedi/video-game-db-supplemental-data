const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const { categories } = require('./helpers');
const parensRetrieve = require('stringman-utils').parensRetrieve;
const parensRemove = require('stringman-utils').parensRemove;

/** change this section for each file run */
const relativePath = '../../textFilesToBeConverted/special/switchGamesEnhancedOnSwitch2.json';
const detailsFix = 'Nintendo Switch games with free upgrades on Switch 2';
const category = categories.enhanced;
const idPrefix = 'ns2eg';
const moveParensToDetails = false;
/** end file variables section */

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const fixed = parsed.map((game, index) => {
    const gameData = typeof game === 'string' ? { name: game } : game;
    if (detailsFix) {
      gameData.details = detailsFix;
    }
    if (moveParensToDetails) {
      const extraData = parensRetrieve(game);
      gameData.details = `${detailsFix} (${extraData[0].trim()})`;
      const parensRemoved = parensRemove(game);
      gameData.name = parensRemoved.trim();
    }
    gameData.id = `${idPrefix}${index + 1}`;
    gameData.igdbId = null;
    gameData.gbId = null;
    gameData.gbGuid = null;
    gameData.tgdbId = null;
    gameData.category = category;
    return gameData;
  });
  const written = fileUtil.writeFile(relativePath, fixed);
  if (written) {
    console.log(chalk.cyan.green('All game data successfully updated!'));
  } else {
    console.log(chalk.red.bold('There was an error writing updates to the file!'));
  }
})();
