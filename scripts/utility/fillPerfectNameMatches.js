const fileUtil = require('./fileUtilities');
const path = require('path');
const _find = require('lodash/find');
const basePath = '../../textFilesToBeConverted';
const finalPath = '../../finalOutput/consoleLists';

/** change out variables in this section each time this is run */
const newFile = require(path.join(basePath, 'special/masterSystemGamesWithFmAudio.json'));
const masterFile = require(path.join(finalPath, 'SegaMasterSystem.json'));
/** end variables */

(function() {
  const masterList = masterFile.map(({ name, igdbId, gbId, gbGuid, tgdbId }) => ({
    name,
    igdbId,
    gbId,
    gbGuid,
    tgdbId
  }));

  const filled = newFile.map(item => {
    const masterMatch = _find(masterList, m => m.name === item.name);
    const matched = masterMatch
      ? Array.isArray(masterMatch)
        ? masterMatch[0]
        : masterMatch
      : null; // just being safe; if I've incorrectly got more than 1 result then this will still work
    if (matched && item.hasOwnProperty('tgdbId')) {
      return {
        ...matched,
        details: item.details,
        id: item.id,
        tgdbId: matched.tgdbId || null,
        category: item.category
      };
    } else if (matched) {
      return { ...matched, details: item.details, id: item.id, category: item.category };
    }
    return item;
  });

  // just checking to make sure filled matches the same length
  console.log(`filled results legnth: ${filled.length} / newFile length: ${newFile.length}`);
  fileUtil.writeFile(path.join(basePath, 'special/masterSystemGamesWithFmAudio2.json'), filled);
})();
