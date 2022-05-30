const path = require('path');
const fs = require('fs');
const _sortBy = require('lodash/sortBy');
const _uniq = require('lodash/uniq');
const _uniqBy = require('lodash/uniqBy');
const _difference = require('lodash/difference');

const masterList = require(path.join(__dirname, '../../../server/static/consoleMasterList.json'));
const lists = require(path.join(__dirname, './listsData')).listData;

// function makeCombinedId(item) {
//   // return `${item.igdbId}-${item.tgdbId}-${item.gbId}`;
//   return `${item.igdbId}-${item.gbId}`;
// }

// function otherFields(list, item, master, platformData) {
//   if (list.key === 'special') {
//     if (!master.special) {
//       master['special'] = [];
//     }
//     master['special'].push({
//       value: Array.isArray(item.details) ? item.details.join(', ') : item.details,
//       forPlatform: platformData
//     });
//   } else {
//     master[list.key] = [platformData];
//   }
// }

(function() {
  lists.forEach(async list => {
    const final = [];
    const platformData = masterList.filter(item => item.id === list.id)[0];

    // fs.writeFile(path.join(__dirname, outPath), JSON.stringify(deduped, null, 2), error => {
    //   if (error) {
    //     console.log(chalk.red.bold('ERROR WRITING OUTPUT FILE!', error));
    //   } else {
    //     console.log(chalk.green.bold('File written!'));
    //   }
    // });
  });
})();
