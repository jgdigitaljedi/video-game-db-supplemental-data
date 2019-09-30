const chalk = require('chalk');
const fileUtil = require('./fileUtilities');

const removeParans = true;
const relativePath = '../../textFilesToBeConverted/special/nesHangtabGames.json';

(async function() {
  const contents = await fileUtil.readFile(relativePath);
  const lines = contents.split('\n');
  const parsed = lines.map(line => {
    let cleaned = line;
    if (removeParans) {
      cleaned = line.replace(/ *\([^)]*\) */g, '');
    }
    return cleaned.replace(/^[\d]+. /g, '').replace(/\r/g, '');
  });
  console.log('parsed', parsed);
  const written = fileUtil.writeFile(relativePath, parsed);
  if (written) {
    console.log(chalk.cyan.green('Numbered list text converted to JSON array!'));
  } else {
    console.log(chalk.red.bold('There was an error writing updates to the file!'));
  }
})();
