const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

/** categories
 * [
    'multiplayer', // multiplayer
    'backwardsCompatibility', // backwards compatible with previous gen(s)
    'launchTitle', // launch titles
    'exclusive', // platform exclusives
    'hits', // greatist hits
    'misprint', // misprints and errors
    'lightGun', // light gun usage
    'builtIn', // built into console
    'banned', // banned in places
    'series', // parts of a series (black box grid, hang tab, etc)
    'peripheral', // pertaining to peripheral (rumble pak, controller, expansion pak, etc)
    'enhanced', // enhanced in  some way for console (DSi)
    'region', // pertaining to region
    'controller', // some unusual controller situation
    'other' // catch all for outliers
 * ]
 */

// change relativePath and idPrefix to run on different files
const relativePath = '../../textFilesToBeConverted/special/sonyPlaystation4TateModeGames.json';
const idPrefix = 'sp4tm';
const parensToDetails = false;
const category = 'other';

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const parsed = JSON.parse(contents);
  const newData = fileUtil.stringArrToObjectArr(
    parsed,
    'Sony PlayStation 4 game supports tate mode',
    idPrefix,
    parensToDetails,
    category
  );
  const result = await fileUtil.writeFile(relativePath, newData);
  if (result) {
    console.log(chalk.cyan.bold('All IDs written!'));
  } else {
    console.log(chalk.red.bold('ERROR WRITING IDS!!'));
  }
})();
