const _difference = require('lodash/difference');

const oldFileRaw = require('../../../finalOutput/consoleLists/nintendoEntertainmentSystem.json');
const newFileRaw = require('../../../finalOutput/consoleListsTest/nintendoEntertainmentSystem.json');
const newFile = newFileRaw.map(game => {
  delete game.misprintsErrors;
  delete game.id;
  const sortedKeys = Object.keys(game)
    .sort()
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

const diff = _difference(oldFile, newFile);
console.log('diff', diff.length);
