const _differenceWith = require('lodash/differenceWith');
const _difference = require('lodash/difference');
const _isEqual = require('lodash/isEqual');
const fs = require('fs');
const path = require('path');

const oldFileRaw = require('../../../finalOutput/consoleLists/MicrosoftXbox360.json');
const newFileRaw = require('../../../finalOutput/consoleListsTest/MicrosoftXbox360.json');
const newFile = newFileRaw.map(game => {
  delete game.misprintsErrors;
  delete game.id;
  const sortedKeys = Object.keys(game)
    // .sort()
    .reduce((acc, key) => {
      acc[key] = game[key];
      return acc;
    });
  return sortedKeys;
});
const oldFile = oldFileRaw.map(game => {
  delete game.id;
  const sortedKeys = Object.keys(game)
    .sort()
    .reduce((acc, key) => {
      acc[key] = game[key];
      return acc;
    });
  return sortedKeys;
});

const diff = _differenceWith(newFileRaw, oldFileRaw, _isEqual);
console.log('diff length', diff.length);
fs.writeFile(path.join(__dirname, 'compareDiff.json'), JSON.stringify(diff, null, 2), err => {
  if (err) {
    console.log(err);
  } else {
    console.log('DONE!');
  }
});
