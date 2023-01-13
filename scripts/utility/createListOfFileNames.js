const { writeFileSync } = require('fs');
const path = require('path');
const { readDir } = require('./fileUtilities');

const dirs = [
  'backwardCompatibility',
  'greatestHits',
  'launchTitles',
  'multiplayer',
  'platformExclusives',
  'platforms',
  'regionLock',
  'special',
  'XboxBc',
  'misprintsAndErrors/accessories',
  'misprintsAndErrors/games',
  'misprintsAndErrors/platforms'
];

const getFiles = files => {
  return files.map(file => {
    const fSplit = file.split('/');
    const fLast = fSplit.length - 1;
    const fName = fSplit[fLast];
    const fnSplit = fName.split('.');
    return fnSplit[0];
  });
};

const allFilesList = [];

const reducer = async (acc, dir) => {
  let files = [];
  try {
    files = await readDir(path.join('../../textFilesToBeConverted', dir));
  } catch (error) {
    console.error('ERROR', error);
    return acc;
  }
  if (files && Array.isArray(files)) {
    const fileNames = getFiles(files);
    allFilesList.push(...fileNames);
    if (!acc) {
      acc = [];
    }
    return [...(await acc), { [dir]: fileNames }];
  } else {
    return acc;
  }
};

module.exports = async function() {
  try {
    const final = await dirs.reduce(reducer, []);
    final.push({ allFiles: allFilesList.sort() });
    writeFileSync(
      path.join(__dirname, '../../notes/fileNamesPerDir.json'),
      JSON.stringify(final, null, 2)
    );
  } catch (error) {
    console.error('ERROR in final', error);
  }
};
