const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parensRemove = require('stringman-utils').parensRemove;
const parensRetrieve = require('stringman-utils').parensRetrieve;

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

module.exports.readFile = function(filePath, fullPath) {
  if (fullPath) {
    return fs.readFileSync(filePath, 'utf-8');
  } else {
    return fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
  }
};

module.exports.incrementIds = function(data, prefix) {
  return data.map((d, index) => {
    d.id = `${prefix}${index + 1}`;
    if (!d.hasOwnProperty('igdbId')) {
      d.igdbId = null;
    }
    if (!d.hasOwnProperty('gbId')) {
      d.gbId = null;
    }
    if (!d.hasOwnProperty('gbGuid')) {
      d.gbGuid = null;
    }
    if (!d.hasOwnProperty('tgdbId')) {
      d.tgdbId = null;
    }
    return d;
  });
};

function moveTextInParens(text) {
  const parensContent = parensRetrieve(text);
  if (parensContent && parensContent.length) {
    const noParens = parensRemove(text);
    return { name: noParens, detailsExtra: parensContent };
  }
  return { name: text, detailsExtra: null };
}

module.exports.stringArrToObjectArr = function(data, details, prefix, parensToDetails, category) {
  return data.map((d, index) => {
    const parens = parensToDetails ? moveTextInParens(d) : { name: d, detailsExtra: null };
    return {
      name: parens.name,
      id: `${prefix}${index + 1}`,
      details: `${details}${parens && parens.detailsExtra ? ' (' + parens.detailsExtra + ')' : ''}`,
      igdbId: null,
      gbId: null,
      gbGuid: null,
      tgdbId: null,
      category
    };
  });
};

module.exports.readDir = function(dirPath) {
  return new Promise((resolve, reject) => {
    const getDirectories = (src, callback) => {
      glob(src + '/**/*', callback);
    };
    getDirectories(path.join(__dirname, dirPath), function(err, res) {
      if (err) {
        console.log('Directory read error', err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports.isDirectory = function(relativePath) {
  return fs.lstatSync(relativePath).isDirectory();
};
