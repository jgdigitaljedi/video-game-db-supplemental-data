const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function getJsonFile(filePath) {
  return fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
}

function writeFileWithUpdate(filePath, data) {
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

function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, filePath), JSON.stringify(data, null, 2), error => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

router.post('/jsonfile', async (req, res) => {
  if (req.body.filePath) {
    try {
      const list = await getJsonFile(req.body.filePath);
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

router.patch('/jsonfile', async (req, res) => {
  try {
    const { filePath, data, removeId } = req.body;
    if (filePath && data) {
      const fileData = await getJsonFile(filePath);
      const parsed = JSON.parse(fileData);
      const newData = parsed.map(item => {
        if (item.id === data.id) {
          item = data;
        }
        return item;
      });
      const updatedFile = await writeFile(filePath, newData);
      res.json(updatedFile);
    } else {
      res.status(400).json({ error: true, message: 'ERROR: INCOMPLETE REQUEST!' });
    }
  } catch (error) {
    console.log('save file error', error);
    res
      .status(500)
      .json({ error: true, message: 'SOMETHING WENT WRONG WRITING THE FILE!', code: error });
  }
});

router.get('/consolelist', async (req, res) => {
  try {
    const consoleList = await getJsonFile('static/consoleMasterList.json');
    res.json(JSON.parse(consoleList));
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: 'ERROR FETCHING COMPLETE CONSOLES LIST!', code: error });
  }
});

router.patch('/listcomplete', async (req, res) => {
  try {
    if (req.body.list && req.body.complete) {
      const list = await getJsonFile('static/fileInfoList.json');
      const parsed = JSON.parse(list);
      const updated = parsed.map(p => {
        if (p.title === req.body.list.title) {
          p.complete = req.body.complete === 'yes';
        }
        return p;
      });
      const written = await writeFile('static/fileInfoList.json', updated);
      res.json(written);
    } else {
      res.status(400).json({ error: true, message: 'YOU MUST SEND A LIST AND A STATUS!' });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: 'ERROR MARKING LIST STATUS!', code: error });
  }
});

router.post('/searchfiles', async (req, res) => {
  if (req.body.fileList && req.body.fileList.length && req.body.searchTerm) {
    try {
      const list = req.body.fileList;
      const promiseArr = list.map((file, index) => {
        return getJsonFile(file.filePath);
      });
      Promise.all(promiseArr)
        .then(results => {
          const fullListArr = results.map(r => JSON.parse(r));
          const flattened = [].concat.apply([], fullListArr);
          const final = flattened.filter(
            item => item.name.toLowerCase().indexOf(req.body.searchTerm.toLowerCase()) >= 0
          );
          res.json(final);
        })
        .catch(error => {
          res.status(500).json({ error: true, message: 'ERROR SEARCHING FILE LIST!', code: error });
          console.log('promise arr error', error);
        });
    } catch (error) {
      console.log('searchfiles error', error);
      res.status(500).json({ error: true, message: 'ERROR FETCHING FILE LIST DATA!', code: error });
    }
  } else {
    res.status(400).json({ error: true, message: 'YOU MUST SEND A FILE LIST!' });
  }
});

router.post('/jointlist', async (req, res) => {
  if (req.body.fileList && req.body.fileList.length) {
    try {
      const list = req.body.fileList;
      const promiseArr = list.map((file, index) => {
        return getJsonFile(file.filePath);
      });
      Promise.all(promiseArr)
        .then(results => {
          const fullListArr = results.map(r => JSON.parse(r));
          const flattened = [].concat.apply([], fullListArr);
          res.json(flattened.map(o => o.name).sort());
        })
        .catch(error => {
          res.status(500).json({ error: true, message: 'ERROR FETCHING JOINT LIST!', code: error });
          console.log('joint list error', error);
        });
    } catch (error) {
      console.log('joint list error', error);
      res
        .status(500)
        .json({ error: true, message: 'ERROR FETCHING JOINT LIST DATA!', code: error });
    }
  } else {
    res.status(400).json({ error: true, message: 'YOU MUST SEND A FILE LIST!' });
  }
});

module.exports = router;
