const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports.writeFile = function(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, filePath), JSON.stringify(data, null, 2), error => {
      if (error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports.readFile = function(filePath) {
  return fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
};

module.exports.incrementIds = function(data, prefix) {
  return data.map((d, index) => {
    d.id = `${prefix}${index + 1}`;
    return d;
  });
};

module.exports.stringArrToObjectArr = function(data, details, prefix) {
  return data.map((d, index) => {
    return {
      name: d,
      id: `${prefix}${index + 1}`,
      details
    };
  });
};
