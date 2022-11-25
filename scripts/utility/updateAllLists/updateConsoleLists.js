const path = require('path');
const fs = require('fs');
const pascalCase = require('stringman-utils').casePascalCase;

const smallFiles = path.join(__dirname, '../../../finalOutput/consoleExtras/smallFiles');
const consoleLists = path.join(__dirname, '../../../finalOutput/consoleExtras');

const masterList = require('../../../finalOutput/consoleMasterList.json');
const allGamesExclusives = require(path.join(smallFiles, 'allGamesForPlatformAreExclusives.json'));
const gameBackupDevices = require(path.join(smallFiles, 'gameBackupDevices.json'));
const regionFree = require(path.join(smallFiles, 'regionFreePlatforms.json'));
const consoleAdapters = require(path.join(smallFiles, 'systemEnhancingConsoleAdapters.json'));
const rgbOutput = require(path.join(smallFiles, 'outputsRgbWithoutMod.json'));

const allExclIds = allGamesExclusives.map(plat => `${plat.igdbId}-${plat.gbId}`);
const backupIds = gameBackupDevices.map(plat => `${plat.igdbId}-${plat.gbId}`);
const regionIds = regionFree.map(plat => `${plat.igdbId}-${plat.gbId}`);
const adapterIds = consoleAdapters.map(plat => `${plat.igdbId}-${plat.gbId}`);
const rgbIds = rgbOutput.map(plat => `${plat.igdbId}-${plat.gbId}`);

let platformStats = {
  allGamesExclusives: 0,
  gameBackupDevices: 0,
  regionFreeConsoles: 0,
  consoleAdapters: 0,
  rgbOutput: 0
};

function getAllExlcusives(combinedId) {
  const index = allExclIds.indexOf(combinedId);
  return index > -1;
}

function getBackupDevices(combinedId) {
  const index = backupIds.indexOf(combinedId);
  return index > -1 ? gameBackupDevices[index].details : null;
}

function getRegionFree(combinedId) {
  const index = regionIds.indexOf(combinedId);
  return index > -1
    ? { details: regionFree[index].details, exceptions: regionFree[index].exceptions }
    : null;
}

function getConsoleAdapters(combinedId) {
  const index = adapterIds.indexOf(combinedId);
  return index > -1 ? consoleAdapters[index].details : null;
}

function getRgb(combinedId) {
  const index = rgbIds.indexOf(combinedId);
  return index > -1 ? rgbOutput[index].details : null;
}

function getFormattedRegionFree(rf) {
  if (!rf) {
    return undefined;
  } else if (rf.details && rf.exceptions && rf.exceptions.length) {
    return { details: rf.details, exceptions: rf.exceptions };
  } else if (rf.details) {
    return { details: rf.details };
  } else if (rf.exceptions && rf.exceptions.length) {
    return { exceptions: rf.exceptions };
  } else {
    return true;
  }
}

(function() {
  const platformsData = masterList
    .map(platform => {
      const combinedId = `${platform.igdbId}-${platform.gbId}`;
      const allEx = getAllExlcusives(combinedId);
      const backup = getBackupDevices(combinedId);
      const region = getRegionFree(combinedId);
      const adapter = getConsoleAdapters(combinedId);
      const rgb = getRgb(combinedId);
      if (allEx || backup || region || adapter || rgb) {
        if (allEx) {
          platformStats.allGamesExclusives++;
        }
        if (backup) {
          platformStats.gameBackupDevices += backup.length;
        }
        if (region) {
          platformStats.regionFreeConsoles++;
        }
        if (adapter) {
          platformStats.consoleAdapters += adapter.length;
        }
        if (rgb) {
          platformStats.rgbOutput++;
        }
        return {
          ...platform,
          details: allEx ? 'All games are exclusive to this platform.' : undefined,
          backupDevices: backup || undefined,
          regionFree: getFormattedRegionFree(region),
          consoleAdapters: adapter || undefined,
          nativeRgbOutput: rgb || undefined
        };
      }
      return null;
    })
    .filter(p => !!p);

  for (let i = 0; i < platformsData.length; i++) {
    fs.writeFileSync(
      path.join(consoleLists, `${pascalCase(platformsData[i].name)}.json`),
      JSON.stringify(platformsData[i], null, 2),
      'utf-8'
    );
  }
  fs.writeFileSync(
    path.join(__dirname, 'platformDataStats.json'),
    JSON.stringify(platformStats, null, 2),
    'utf-8'
  );
})();
