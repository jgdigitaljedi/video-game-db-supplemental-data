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
const mpAdapters = require(path.join(smallFiles, 'multiplayerAdapters.json'));
const burnedDiscs = require(path.join(smallFiles, 'platformsThatPlayBurnedDiscs.json'));
const lightGuns = require(path.join(smallFiles, 'lightGuns.json'));
const flashCarts = require(path.join(smallFiles, 'flashCarts.json'));
const hardClones = require(path.join(smallFiles, 'clonesThatPlayOriginalGames.json'));
const softClones = require(path.join(smallFiles, 'clonesWithBuiltInGames.json'));

function getCombinedId(data) {
  return data.map(plat => `${plat.igdbId}-${plat.gbId}`);
}

const allExclIds = getCombinedId(allGamesExclusives);
const backupIds = getCombinedId(gameBackupDevices);
const regionIds = getCombinedId(regionFree);
const adapterIds = getCombinedId(consoleAdapters);
const rgbIds = getCombinedId(rgbOutput);
const mpIds = getCombinedId(mpAdapters);
const burnedIds = getCombinedId(burnedDiscs);
const lgIds = getCombinedId(lightGuns);
const fcIds = getCombinedId(flashCarts);
const hcIds = getCombinedId(hardClones);
const scIds = getCombinedId(softClones);

let platformStats = {
  allGamesExclusives: 0,
  gameBackupDevices: 0,
  regionFreeConsoles: 0,
  consoleAdapters: 0,
  rgbOutput: 0,
  multiplayerAdapters: 0,
  burnedDiscs: 0,
  lightGuns: 0,
  flashCarts: 0,
  hardwareClones: 0,
  softwareClones: 0
};

function getBool(combinedId, ids) {
  const index = ids.indexOf(combinedId);
  return index > -1;
}

function getDetails(combinedId, ids, data, prop) {
  const index = ids.indexOf(combinedId);
  return index > -1 ? data[index][prop] : null;
}

function getRegionFree(combinedId) {
  const index = regionIds.indexOf(combinedId);
  return index > -1
    ? { details: regionFree[index].details, exceptions: regionFree[index].exceptions }
    : null;
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
      const allEx = getBool(combinedId, allExclIds);
      const backup = getDetails(combinedId, backupIds, gameBackupDevices, 'details');
      const region = getRegionFree(combinedId);
      const adapter = getDetails(combinedId, adapterIds, consoleAdapters, 'details');
      const rgb = getDetails(combinedId, rgbIds, rgbOutput, 'details');
      const multi = getDetails(combinedId, mpIds, mpAdapters, 'adapters');
      const burned = getDetails(combinedId, burnedIds, burnedDiscs, 'details');
      const lg = getDetails(combinedId, lgIds, lightGuns, 'details');
      const fc = getDetails(combinedId, fcIds, flashCarts, 'details');
      const hc = getDetails(combinedId, hcIds, hardClones, 'details');
      const sc = getDetails(combinedId, scIds, softClones, 'details');

      if (allEx || backup || region || adapter || rgb || multi || burned || lg || fc || hc || sc) {
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
        if (multi) {
          platformStats.multiplayerAdapters += multi.length;
        }
        if (burned) {
          platformStats.burnedDiscs++;
        }
        if (lg) {
          platformStats.lightGuns += lg.length;
        }
        if (fc) {
          platformStats.flashCarts += fc.length;
        }
        if (hc) {
          platformStats.hardwareClones += hc.length;
        }
        if (sc) {
          platformStats.softwareClones += sc.length;
        }
        return {
          ...platform,
          details: allEx ? 'All games are exclusive to this platform.' : undefined,
          backupDevices: backup || undefined,
          regionFree: getFormattedRegionFree(region),
          consoleAdapters: adapter || undefined,
          nativeRgbOutput: rgb || undefined,
          multiplayerAdapters: multi || undefined,
          playsBurnedDiscs: burned || undefined,
          lightGuns: lg || undefined,
          flashCarts: fc || undefined,
          hardwareClones: hc || undefined,
          softwareClones: sc || undefined
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
