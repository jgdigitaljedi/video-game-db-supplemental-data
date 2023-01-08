const path = require('path');
const fileUtils = require('./fileUtilities');
const basePath = path.join('../../textFilesToBeConverted');
const categories = require('./helpers.js').categories;

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

/** list specific vars */
const listPath = path.join(basePath, 'XboxBc/XboxToXboxOne.json');
const list = require(listPath);
const listCategory = categories.backwardsCompatibility;
/** end list specific vars */

(async function() {
  const withcat = list.map(item => ({ ...item, category: listCategory }));
  try {
    await fileUtils.writeFile(listPath, withcat);
    console.log('DONE!');
  } catch (err) {
    console.error('ERROR ADDING CATEGORIES', err);
  }
})();
