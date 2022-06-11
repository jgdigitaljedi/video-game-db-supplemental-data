const path = require('path');
const fs = require('fs');
const _sortBy = require('lodash/sortBy');
const _uniqBy = require('lodash/uniqBy');
const _cloneDeep = require('lodash/cloneDeep');
const chalk = require('chalk');

const masterList = require(path.join(__dirname, '../../../server/static/consoleMasterList.json'));
const lists = require(path.join(__dirname, './listsData')).listData;

function getNewEntry(game) {
  return {
    name: game.name,
    id: null,
    igdbId: game.igdbId,
    gbId: game.gbId,
    gbGuid: game.gbGuid,
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
      const listLast = (data && data.length - 1) || -1;
      if (listLast > -1) {
        const whichProp = which === 'exclusives' ? 'isExclusive' : 'isLaunchTitle';
        let finalClone = _cloneDeep(final);

        for (let i = 0; i < data.length; i++) {
          const game = data[i];
          const finalsIds = finalClone.map(g => g.igdbId);
          const existingId = finalsIds.indexOf(game.igdbId);
          if (existingId > -1) {
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
          const game = data[i];
          const existingId = finalsIds.indexOf(game.igdbId);
          if (existingId > -1) {
            finalClone[existingId].misprintsErrors.push(getMisprintObj(game));
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
        console.log('not an array', list[0].details);
        finalClone = [];
      }
      const listLast = (list && list.length - 1) || 0;
      for (let i = 0; i < list.length; i++) {
        const finalsIds = finalClone.map(g => g.igdbId);
        const game = list[i];
        const existingId = finalsIds.indexOf(game.igdbId);
        if (existingId > -1) {
          finalClone[existingId].special.push({
            value: game.details,
            forPlatform: pData
          });
          const dedpuedSpecial = _uniqBy(finalClone[existingId].special, 'value');
          finalClone[existingId].special = dedpuedSpecial;
        } else {
          const newEntry = getNewEntry(game);
          newEntry.special.push({
            value: game.details,
            forPlatform: pData
          });
          finalClone.push(newEntry);
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
      if (lastList > 0) {
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
  await lists.forEach(async list => {
    try {
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
      const withIds = special.map((item, i) => {
        item.id = `${list.prefix}${i}`;
        return item;
      });
      fs.writeFile(list.output, JSON.stringify(withIds, null, 2), error => {
        if (error) {
          console.log(chalk.red.bold(`ERROR WRITING OUTPUT FILE: ${list.output}`, error));
        } else {
          console.log(chalk.green.bold(`File ${list.output} written!`));
        }
      });
    } catch (err) {
      console.log(chalk.red.bold('FUCKING ERRORS', err));
    }
  });
})();
