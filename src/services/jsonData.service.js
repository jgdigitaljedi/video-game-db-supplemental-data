import axios from 'axios';

export default {
  igdbGameLookup(name, platform) {
    return axios.post('http://localhost:4001/igdb/gamelookup', { name, platform });
  },
  igdbGameFuzzy(name) {
    return axios.post('http://localhost:4001/igdb/gamefuzzy', { name });
  },
  gbGameLookup(name, platform) {
    return axios.post('http://localhost:4001/gb/gamelookup', { name, platform });
  },
  saveGame(oldData, newData, list) {
    return axios.post('http://localhost:4001/files/saveGame', { oldData, newData, list });
  }
};
