const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

const relativeDirPath = '../../finalOutput';

(async function() {
  const files = await fileUtil.readDir(relativeDirPath);
  const result = [];
  for (const file in files) {
    if (!fileUtil.isDirectory(files[file])) {
      const content = await fileUtil.readFile(files[file], true);
      const parsed = JSON.parse(content);
      const missing = parsed.filter(item => !item.igdbId && !item.gbId && !item.tgdbId);
      if (missing.length) {
        result.push({ file: files[file], missing });
      }
    }
  }
  console.log('result', result);
  fileUtil.writeFile('missingDataList.json', result);
})();
