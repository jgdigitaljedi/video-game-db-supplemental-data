import axios from 'axios';

export default {
  /**  API lookups **/
  igdbGameLookup(name, platform) {
    return axios.post('http://localhost:4001/igdb/gamelookup', { name, platform });
  },
  igdbGameFuzzy(name) {
    return axios.post('http://localhost:4001/igdb/gamefuzzy', { name });
  },
  igdbPlatform(name) {
    return axios.post('http://localhost:4001/igdb/platform', { name });
  },
  gbGameLookup(name, platform) {
    return axios.post('http://localhost:4001/gb/gamelookup', { name, platform });
  },
  gbPlatformLookup(name, platform) {
    return axios.post('http://localhost:4001/gb/platformlookup', { name, platform });
  },
  tgdbPlatformLookup(name, platform) {
    return axios.post('http://localhost:4001/tgdb/platformlookup', { name, platform });
  },
  tgdbGameLookup(name, platform) {
    return axios.post('http://localhost:4001/tgdb/gamelookup', { name, platform });
  },

  /** file operations */
  saveGame(oldData, newData, list) {
    return axios.post('http://localhost:4001/files/saveGame', { oldData, newData, list });
  },
  saveFile(data, list) {
    console.log('data', data);
    console.log('list', list);
    return axios.patch('http://localhost:4001/files/jsonfile', { filePath: list.filePath, data });
  },
  getFile(filePath) {
    return axios.post(`http://localhost:4001/files/jsonfile`, { filePath });
  },
  getConsoleList() {
    return axios.get(`http://localhost:4001/files/consolelist`);
  },
  markListStatus(list, complete) {
    return axios.patch(`http://localhost:4001/files/listcomplete`, { list, complete });
  },
  getMasterPlatforms() {
    return axios.get(`http://localhost:4001/files/consolelist`);
  }
};
