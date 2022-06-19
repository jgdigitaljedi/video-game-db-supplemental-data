const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const masterList = [];
const combinedIds = [];

function runThroughFile(data) {
  return new Promise((resolve, reject) => {
    try {
      JSON.parse(data).forEach(d => {
        const igdbId = d.igdbId || null;
        const gbId = d.gbId || null;
        const combined = `${igdbId}-${gbId}`;
        if (combinedIds.indexOf(combined) >= 0) {
          // const item = masterList.find(ml => ml.igdbId === igdbId && ml.gbId === gbId);
          // item.details.push(...d.details);
          // if (d.isExclusive) {
          //   item.isExclusive.push(...d.isExclusive);
          // }
          // if (d.isLaunchTitle) {
          //   item.isLaunchTitle.push(...d.isLaunchTitle);
          // }
          // if (d.special && d.special.length) {
          //   item.special.push(...d.special);
          // }
          masterList.find((ml, index) => {
            if (ml.igdbId === igdbId && ml.gbId === gbId) {
              console.log('name', d.name);
              masterList[index].details.push(...d.details);
              if (d.isExclusive) {
                masterList[index].isExclusive.push(...d.isExclusive);
              }
              if (d.isLaunchTitle) {
                masterList[index].isLaunchTitle.push(...d.isLaunchTitle);
              }
              if (d.special) {
                masterList[index].special.push(...d.special);
              }
              return true;
            }
            return false;
          });
        } else {
          console.log('gbId', gbId);
          combinedIds.push(combined);
          masterList.push(d);
        }
        resolve();
      });
    } catch (err) {
      reject();
    }
  });
}

(async function() {
  const relativePath = '../../finalOutput/consoleLists';
  const files = fs.readdirSync(path.resolve(__dirname, relativePath));
  const filesLen = files.length;
  for (let i = 0; i < filesLen; i++) {
    const data = fs.readFileSync(path.resolve(__dirname, `${relativePath}/${files[i]}`), 'utf-8');
    await runThroughFile(data);
    return;
  }
  // files.forEach(async file => {
  //   const data = fs.readFileSync(path.resolve(__dirname, `${relativePath}/${file}`), 'utf-8');
  //   await runThroughFile(data);
  //   return;
  // });
  fs.writeFile(
    path.resolve(__dirname, '../../finalOutput/combinedMasterList.json'),
    JSON.stringify(masterList),
    error => {
      if (error) {
        chalk.red.bold('THERE WAS AN ERROR CREATING THE MASTER LIST!');
      } else {
        chalk.green('The master list was written successfully!');
      }
    }
  );
})();
