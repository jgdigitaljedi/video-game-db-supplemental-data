const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const { categories } = require('./helpers');

/** change this section for each file run */
const relativePath = '../../textFilesToBeConverted/special/nintendoDsCartsWithBuiltInDevices.json';
const detailsFix = null;
const category = categories.other;
const idPrefix = 'ndsbi';
/** end file variables section */

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const fixed = parsed.map((game, index) => {
    if (detailsFix) {
      game.details = detailsFix;
    }
    game.id = `${idPrefix}${index + 1}`;
    game.igdbId = null;
    game.gbId = null;
    game.gbGuid = null;
    game.tgdbId = null;
    game.category = category;
    return game;
  });
  const written = fileUtil.writeFile(relativePath, fixed);
  if (written) {
    console.log(chalk.cyan.green('All game data successfully updated!'));
  } else {
    console.log(chalk.red.bold('There was an error writing updates to the file!'));
  }
})();
