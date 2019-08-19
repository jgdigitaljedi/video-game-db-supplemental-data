import axios from 'axios';

export default {
  search(name, platform) {
    return axios.post('http://localhost:4001/igdb/search', { name, platform });
  },
  fuzzy(name) {
    return axios.post('http://localhost:4001/igdb/fuzzy', { name });
  },
  saveGame(oldData, newData, list) {
    return axios.post('http://localhost:4001/files/saveGame', { oldData, newData, list });
  }
};