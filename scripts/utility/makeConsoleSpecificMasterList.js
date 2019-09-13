const chalk = require('chalk');
const fileUtil = require('./fileUtilities');
const fs = require('fs');
const path = require('path');
const _sortBy = require('lodash/sortBy');
const _uniq = require('lodash/uniq');

// change
const filesArr = [
  '../../finalOutput/smallFiles/launchTitles/nesLaunchTitles.json',
  '../../finalOutput/smallFiles/special/nesBlackBoxTitles.json',
  '../../finalOutput/smallFiles/platformExclusives/nesExclusives.json'
];
const mlId = 'ccl1';
const outPath = '../../finalOutput/consoleLists/nintendoEntertainmentSystem.json';
const idPrefix = 'nes';

function makeCombinedId(item) {
  return `${item.igdbId}-${item.tgdbId}-${item.gbId}`;
}

(async function() {
  const final = [];
  const masterList = await fileUtil.readFile('../../server/static/consoleMasterList.json');
  const platformData = JSON.parse(masterList).filter(item => item.id === mlId)[0];
  for (const list of filesArr) {
    const fileRaw = await fileUtil.readFile(list);
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
        } else {
          final[fIndex].details.push(item.details);
        }
      } else {
        final.push(item);
      }
    });
  }
  const mayHaveDupes = _sortBy(final, 'name');
  const withNewIds = mayHaveDupes.map((item, index) => {
    item.id = `${idPrefix}${index}`;
    return item;
  });
  const names = withNewIds.map(i => i.name);
  const unique = _uniq(names);
  if (names.length !== unique.length) {
    console.log(
      chalk.red.bold(
        `YOU HAVE SOME DUPLICATES TO LOOK AT MANUALLY! The arrays had a difference of ${names.length -
          unique.length} items!`
      )
    );
  }
  fs.writeFile(path.join(__dirname, outPath), JSON.stringify(withNewIds, null, 2), error => {
    if (error) {
      console.log(chalk.red.bold('ERROR WRITING OUTPUT FILE!', error));
    } else {
      console.log(chalk.green.bold('File written!'));
    }
  });
})();