const path = require('path');
const fs = require('fs');
const _sortBy = require('lodash/sortBy');
const _uniqBy = require('lodash/uniqBy');
const _uniq = require('lodash/uniq');
const _cloneDeep = require('lodash/cloneDeep');
const _flatten = require('lodash/flatten');
const chalk = require('chalk');

const masterList = require(path.join(__dirname, '../../../server/static/consoleMasterList.json'));
let lists = require(path.join(__dirname, './listsData')).listData;

/* To isolate a single list, uncomment this and change list name */
// lists = lists.filter(list => list.name === 'Bandai WonderSwan Color');
/*************************************************************** */

function getNewEntry(game) {
  return {
    name: game.name,
    id: null,
    igdbId: game.igdbId,
    gbId: game.gbId,
    gbGuid: game.gbGuid,
    tgdbId: game.tgdbId || undefined,
    details: [],
    isExclusive: [],
    isLaunchTitle: [],
    special: [],
    misprintsErrors: []
  };
}

function launchExclusives(data, which, pData, final) {
  return new Promise((resolve, reject) => {
    try {
      const listLast = data && data.length > 0 ? data.length - 1 : -1;
      if (listLast > -1) {
        const whichProp = which === 'exclusives' ? 'isExclusive' : 'isLaunchTitle';
        let finalClone = _cloneDeep(final);

        for (let i = 0; i < data.length; i++) {
          const game = data[i];
          const finalsIds = finalClone.map(g => g.igdbId);
          const finalsNames = finalClone.map(g => g.name);
          const existingId = finalsIds.indexOf(game.igdbId);
          const existingName = finalsNames.indexOf(game.name);
          if (existingId > -1 && game.igdbId) {
            if (!Array.isArray(finalClone[existingId][whichProp])) {
              finalClone[existingId][whichProp] = [];
            }
            if (!Array.isArray(finalClone[existingId].details)) {
              finalClone[existingId].details = [];
            }
            if (finalClone[existingId].details.indexOf(game.details) < 0) {
              finalClone[existingId][whichProp].push(pData);
              finalClone[existingId].details.push(game.details);
            }
          } else if (existingName > -1) {
            if (!Array.isArray(finalClone[existingName][whichProp])) {
              finalClone[existingName][whichProp] = [];
            }
            if (!Array.isArray(finalClone[existingName].details)) {
              finalClone[existingName].details = [];
            }
            if (finalClone[existingName].details.indexOf(game.details) < 0) {
              finalClone[existingName][whichProp].push(pData);
              finalClone[existingName].details.push(game.details);
            }
          } else {
            const newEntry = getNewEntry(game);
            newEntry[whichProp].push(pData);
            newEntry.details.push(game.details);
            finalClone.push(newEntry);
          }
          if (i === listLast) {
            resolve(finalClone);
          }
        }
      } else {
        resolve(final);
      }
    } catch (error) {
      resolve({ error });
    }
  });
}

function getMisprintObj({ image, details, type }) {
  return { image, details, type };
}

function misprintLogic(data, pData, final) {
  return new Promise((resolve, reject) => {
    try {
      const listLast = (data && data.length - 1) || 0;
      if (listLast > 0) {
        let finalClone = _cloneDeep(final);
        for (let i = 0; i < data.length; i++) {
          const finalsIds = finalClone.map(g => g.igdbId);
          const finalsNames = finalClone.map(g => g.name);
          const game = data[i];
          const existingId = finalsIds.indexOf(game.igdbId);
          const existingName = finalsIds.indexOf(game.name);
          if (existingId > -1 && game.igdbId) {
            finalClone[existingId].misprintsErrors.push(getMisprintObj(game));
          } else if (existingName > -1) {
            finalClone[existingName].misprintsErrors.push(getMisprintObj(game));
          } else {
            const newEntry = getNewEntry(game);
            newEntry.misprintsErrors.push(getMisprintObj(game));
            finalClone.push(newEntry);
          }
          if (i === listLast) {
            resolve(finalClone);
          }
        }
      } else {
        resolve(final);
      }
    } catch (error) {
      resolve({ error, func: 'misprints' });
    }
  });
}

async function handleSpecialList(list, pData, final) {
  return new Promise((resolve, reject) => {
    try {
      let finalClone = _cloneDeep(final);
      if (!Array.isArray(finalClone)) {
        finalClone = [];
      }
      const listLast = (list && list.length - 1) || 0;
      for (let i = 0; i < list.length; i++) {
        const finalsIds = finalClone.map(g => g.igdbId);
        const finalsName = finalClone.map(g => g.name);
        const game = list[i];
        const existingId = finalsIds.indexOf(game.igdbId);
        if (!game.igdbId) {
          const existingName = finalsName.indexOf(game.name);
          if (existingName > -1) {
            finalClone[existingName].special.push({
              value: Array.isArray(game.details) ? game.details[0] : game.details,
              forPlatform: pData
            });
            const dedpuedSpecial = _uniqBy(finalClone[existingName].special, 'value');
            finalClone[existingName].special = dedpuedSpecial;
            finalClone[existingName].details = _uniq(
              _flatten([...finalClone[existingName].details, game.details])
            );
          } else {
            const newEntry = getNewEntry(game);
            newEntry.special.push({
              value: Array.isArray(game.details) ? game.details[0] : game.details,
              forPlatform: pData
            });
            newEntry.details = _flatten([game.details]);
            finalClone.push(newEntry);
          }
        } else if (existingId < 0) {
          const newEntry = getNewEntry(game);
          newEntry.special.push({
            value: Array.isArray(game.details) ? game.details[0] : game.details,
            forPlatform: pData
          });
          newEntry.details = _flatten([game.details]);
          finalClone.push(newEntry);
        } else {
          finalClone[existingId].special.push({
            value: Array.isArray(game.details) ? game.details[0] : game.details,
            forPlatform: pData
          });
          const dedpuedSpecial = _uniqBy(finalClone[existingId].special, 'value');
          finalClone[existingId].special = dedpuedSpecial;
          finalClone[existingId].details = _uniq(
            _flatten([...finalClone[existingId].details, game.details])
          );
        }
        if (listLast === i) {
          resolve(finalClone);
        }
      }
    } catch (error) {
      resolve({ error, func: 'special' });
    }
  });
}

function handleSpecial(lists, final, pData) {
  return new Promise(async (resolve, reject) => {
    try {
      const lastList = (lists && lists.length - 1) || 0;
      let finalClone = _cloneDeep(final);
      if (lists && lastList > -1) {
        for (let i = 0; i < lists.length; i++) {
          try {
            const specialAdded = await handleSpecialList(lists[i], pData, finalClone);
            if (specialAdded.error) {
              console.log(chalk.red.bold('ERROR ADDING SPECIAL', specialAdded.error));
            }
            finalClone = specialAdded;
          } catch (e) {
            console.log(chalk.red.bold('ERROR IN SPECIAL LIST', error));
          }
        }
        resolve(finalClone);
      } else {
        resolve(final);
      }
    } catch (error) {
      console.log(chalk.yellow('SPECIAL ERROR IN CATCH', error));
      resolve({ error });
    }
  });
}

(async function() {
  for (let i = 0; i < lists.length; i++) {
    try {
      const list = lists[i];
      const platformData = masterList.filter(item => item.id === list.id)[0];
      const launchTitles = await launchExclusives(list.launchTitles, 'launch', platformData, []);
      if (launchTitles.error) {
        throw launchTitles.error;
      }
      const exclusives = await launchExclusives(
        list.exclusives,
        'exclusives',
        platformData,
        launchTitles
      );
      if (exclusives.error) {
        throw exclusives.error;
      }
      const misprintsAndErrors = await misprintLogic(
        list.misprintsAndErrors,
        platformData,
        exclusives
      );
      if (misprintsAndErrors.error) {
        throw misprintsAndErrors.error;
      }
      const special = await handleSpecial(list.special, misprintsAndErrors, platformData);
      if (special.error) {
        throw special.error;
      }
      const withIds = _sortBy(special, 'name').map((item, i) => {
        item.id = `${list.prefix}${i}`;
        if (!item.isExclusive || !item.isExclusive.length) {
          item.isExclusive = false;
        }
        if (!item.isLaunchTitle || !item.isLaunchTitle.length) {
          item.isLaunchTitle = false;
        }
        item.details = _flatten(item.details);
        return item;
      });
      fs.writeFile(list.output, JSON.stringify(withIds, null, 2), error => {
        if (error) {
          console.log(chalk.red.bold(`ERROR WRITING OUTPUT FILE: ${list.output}`, error));
        } else {
          console.log(chalk.green.bold(`File ${list.output} written!`));
        }
      });
    } catch (error) {
      console.log(chalk.red.bold('Final catch block errors', err));
    }
  }
})();
