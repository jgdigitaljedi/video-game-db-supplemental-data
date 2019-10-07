const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

// change relativePath and detailsFix to run on different files
const relativePath = '../../finalOutput/smallFiles/special/blackBoxGridGenesisGames.json';
const detailsFix = 'Sega Genesis/Mega Drive black box grid game';

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const fixed = parsed.map(game => {
    if (game.details) {
      if (Array.isArray(game.details)) {
        // const dFixed = game.details.map(detail => {
        //   return `${detailsFix} - ${detail}`;
        // });
        const dFixed = [`${detailsFix} - ${game.details.join(', ')}`];
        game.details = dFixed;
      } else {
        const dFixed = `${detailsFix} - ${game.details}`;
        game.details = [dFixed];
      }
    } else {
      game.details = [detailsFix];
    }
    return game;
  });
  const written = fileUtil.writeFile(relativePath, fixed);
  if (written) {
    console.log(chalk.cyan.green('All game data successfully updated!'));
  } else {
    console.log(chalk.red.bold('There was an error writing updates to the file!'));
  }
})();
