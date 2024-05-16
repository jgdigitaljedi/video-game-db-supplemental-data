const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const { categories } = require('./helpers');

/** change this section for each file run */
const relativePath = '../../textFilesToBeConverted/special/n64GamesWithWidescreen.json';
const detailsFix = "Nintendo 64 game has widescreen mode";
const category = categories.other;
const idPrefix = 'n64ws';
/** end file variables section */

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const fixed = parsed.map((game, index) => {
    const gameData = typeof game === 'string' ? {name: game} : game;
    if (detailsFix) {
      gameData.details = detailsFix;
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
