const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

// change
const filesArr = [];
const mlId = '';
const outPath = '../../finalOutput/consoleLists/microsoftXbox.json';

(async function() {
  const final = [];
  const masterList = await fileUtil.readFile('../../server/static/consoleMasterList.json');
  const platformData = JSON.parse(masterList).filter(item => item.id === mlId)[0];
  for (const list of filesArr) {
    const fileRaw = await fileUtil.readFile(file);
    const parsed = JSON.parse(fileRaw);
    parsed.forEach(item => {
      final.push(item);
    });
  }
  // now final should be full of stuff and contain duplicates
  // the duplicates need to be combined where the details from each is part of an array so details = ['detail 1', 'detail 2', 'etc']
})();
