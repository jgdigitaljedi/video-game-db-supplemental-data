const path = require('path');
const fs = require('fs');
const _sortBy = require('lodash/sortBy');
const _uniq = require('lodash/uniq');
const _uniqBy = require('lodash/uniqBy');
const _difference = require('lodash/difference');
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
      const listLast = (data && data.length - 1) || 0;
      if (listLast > 0) {
        const whichProp = which === 'exclusives' ? 'isExclusive' : 'isLaunchTitle';
        let finalClone = _cloneDeep(final);
        const finalsIds = finalClone.map(g => g.igdbId);
        return data.forEach((game, index) => {
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
          if (index === listLast) {
            resolve(finalClone);
          }
        });
      } else {
        resolve(final);
      }
    } catch (error) {
      reject({ error });
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
        const finalsIds = finalClone.map(g => g.igdbId);
        return data.forEach((game, index) => {
          const existingId = finalsIds.indexOf(game.igdbId);
          if (existingId > -1) {
            finalClone[existingId].misprintsErrors.push(getMisprintObj(game));
          } else {
            const newEntry = getNewEntry(game);
            newEntry.misprintsErrors.push(getMisprintObj(game));
            finalClone.push(newEntry);
          }
          if (index === listLast) {
            resolve(finalClone);
          }
        });
      } else {
        resolve(final);
      }
    } catch (error) {
      reject({ error });
    }
  });
}

async function handleSpecial(lists, final, pData) {
  return new Promise((resolve, reject) => {
    try {
      const lastList = (lists && lists.length - 1) || 0;
      if (lastList > 0) {
        return lists.forEach((list, index) => {
          const lastItem = (list && list.length - 1) || 0;
          return list.forEach((game, i) => {
            if (index === lastList && lastItem === i) {
              resolve(final);
            }
          });
        });
      } else {
        resolve(final);
      }
    } catch (error) {
      reject({ error });
    }
  });
}

(async function() {
  await lists.forEach(async list => {
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
    const special = misprintsAndErrors; // TODO: write this
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
  });
})();
