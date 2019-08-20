const fs = require('fs');
const path = require('path');

module.exports = {
  consolesList: () => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, 'consoleMasterList.json'), 'utf-8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  },
  writeConsolesList: list => {
    return new Promise((resolve, reject) => {
      try {
        fs.writeFile(
          path.join(__dirname, 'consoleMasterList.json'),
          JSON.stringify(list, null, 2),
          err => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
};
