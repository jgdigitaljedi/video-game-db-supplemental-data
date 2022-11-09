const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const fs = require('fs');
const path = require('path');
const _sortBy = require('lodash/sortBy');
const _uniq = require('lodash/uniq');
const _uniqBy = require('lodash/uniqBy');
const _difference = require('lodash/difference');

// change
const filesArr = [
  {
    key: 'isLaunchTitle',
    path: '../../finalOutput/smallFiles/launchTitles/n64LaunchTitles.json'
  },
  {
    key: 'isExclusive',
    path: '../../finalOutput/smallFiles/platformExclusives/nintendoN64Exclusives.json'
  },
  {
    key: 'misprintsAndErrors',
    path: '../../finalOutput/smallFiles/misprintsAndErrors/n64MisprintsAndErrors.json'
  },
  {
    key: 'special',
    path: '../../finalOutput/smallFiles/greatestHits/nintendo64PlayersChoice.json'
  },
  {
    key: 'special',
    path: '../../finalOutput/smallFiles/special/n64ExpansionPakGames.json'
  },
  {
    key: 'special',
    path: '../../finalOutput/smallFiles/multiplayer/n64_4playerGames.json'
  },
  {
    key: 'special',
    path: '../../finalOutput/smallFiles/multiplayer/n64_3playerGames.json'
  }
];
const mlId = 'ccl3';
const outPath = '../../finalOutput/consoleLists/Nintendo64.json';
const idPrefix = 'n64';

function makeCombinedId(item) {
  // return `${item.igdbId}-${item.tgdbId}-${item.gbId}`;
  return `${item.igdbId}-${item.gbId}`;
}

function otherFields(list, item, master, platformData) {
  if (list.key === 'special') {
    if (!master.special) {
      master['special'] = [];
    }
    master['special'].push({
      value: Array.isArray(item.details) ? item.details.join(', ') : item.details,
      forPlatform: platformData
    });
  } else {
    master[list.key] = [platformData];
  }
}

(async function() {
  const final = [];
  const masterList = await fileUtil.readFile('../../server/static/consoleMasterList.json');
  const platformData = JSON.parse(masterList).filter(item => item.id === mlId)[0];
  for (const list of filesArr) {
    const fileRaw = await fileUtil.readFile(list.path);
    const parsed = JSON.parse(fileRaw);
    // make perfect matches where all 3 ids are the same; the rest will end up as duplicates which we can look at manually
    const idArr = final.map(f => makeCombinedId(f));
    parsed.forEach(item => {
      const pId = makeCombinedId(item);
      const fIndex = idArr.indexOf(pId);
      if (fIndex >= 0) {
        if (!Array.isArray(final[fIndex].details)) {
          final[fIndex].details = [final[fIndex].details];
        }
        if (Array.isArray(item.details)) {
          item.details.forEach(d => final[fIndex].details.push(d));
          otherFields(list, item, final[fIndex], platformData);
        } else {
          final[fIndex].details.push(item.details);
          otherFields(list, item, final[fIndex], platformData);
        }
      } else {
        if (list.key === 'special') {
          item.special = [
            {
              value: Array.isArray(item.details) ? item.details.join(', ') : item.details,
              forPlatform: platformData
            }
          ];
        } else {
          item[list.key] = [platformData];
        }
        final.push(item);
      }
    });
  }
  const sorted = final.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  const mayHaveDupes = _sortBy(sorted, 'name').map(d => {
    if (!Array.isArray(d.details)) {
      d.details = [d.details];
    }
    return d;
  });
  const withNewIds = mayHaveDupes.map((item, index) => {
    item.id = `${idPrefix}${index}`;
    if (!item.isExclusive) {
      item.isExclusive = false;
    }
    if (!item.isLaunchTitle) {
      item.isLaunchTitle = false;
    }
    if (!item.special) {
      item.special = [];
    }
    return item;
  });
  const names = withNewIds.map(i => i.name);
  const unique = _uniq(names);
  const diff = _difference(names, unique);
  if (diff.length) {
    console.log(
      chalk.red.bold(
        `YOU HAVE SOME DUPLICATES TO LOOK AT MANUALLY! The arrays had a difference of ${
          diff.length
        } item(s) : ${JSON.stringify(diff)}`
      )
    );
  }
  // now to dedupe details and special arrays
  const deduped = withNewIds.map(game => {
    const uniqDetails = _uniq(game.details);
    game.details = uniqDetails;

    const uniqSpecial = _uniqBy(game.special, 'value');
    game.special = uniqSpecial;

    return game;
  });

  fs.writeFile(path.join(__dirname, outPath), JSON.stringify(deduped, null, 2), error => {
    if (error) {
      console.log(chalk.red.bold('ERROR WRITING OUTPUT FILE!', error));
    } else {
      console.log(chalk.green.bold('File written!'));
    }
  });
})();
