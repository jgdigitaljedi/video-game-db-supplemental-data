import axios from 'axios';

export default {
  search(name, platform) {
    return axios.post('http://localhost:4001/igdb/gamelookup', { name, platform });
  },
  fuzzy(name) {
    return axios.post('http://localhost:4001/igdb/gamefuzzy', { name });
  },
  gbGameLookup(name, platform) {
    return axios.post('http://localhost:4001/gb/gamelookup', { name, platform });
  },
  saveGame(oldData, newData, list) {
    return axios.post('http://localhost:4001/files/saveGame', { oldData, newData, list });
  }
};