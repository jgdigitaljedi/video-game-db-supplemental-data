const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function getJsonFile(filePath) {
  return fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
}

function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    try {
      const oldFile = getJsonFile(filePath);
      const ids = oldFile.map(obj => obj.id);
      const index = ids.indexOf(data.id);
      const keys = Object.keys(data);
      keys.forEach(key => {
        oldFile[index][key] = data[key];
      });
      fs.writeFile(path.join(__dirname, filePath), olfFile, (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

router.get('/jsonfile', async (req, res) => {
  if (res.body.filePath) {
    try {
      const list = await getJsonFile(filePath);
      res.json(JSON.parse(list));
    } catch (error) {
      res
        .status(500)
        .json({ error: true, message: 'SOMETHING WENT WRONG FETCHING THE FILE!', code: error });
    }
  } else {
    res
      .status(400)
      .json({ error: true, message: 'YOU MUST SEND A FILE PATH TO FETCH FILE CONTENTS!"' });
  }
});

router.post('/writejson', async (req, res) => {
  try {
    const { filePath, data } = req.body;
    if (filePath && data) {
      const updatedFile = await writeFile(filePath, data);
      res.json(updatedFile);
    } else {
      res.status(400).json({ error: true, message: 'ERROR: INCOMPLETE REQUEST!' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: 'SOMETHING WENT WRONG WRITING THE FILE!', code: error });
  }
});

module.exports = router;
