import axios from 'axios';

export default {
  search(name, platform) {
    return axios.post('http://localhost:4001/api/search', { name, platform });
  },
  fuzzy(name) {
    return axios.post('http://localhost:4001/api/fuzzy', { name });
  },
  games() {
    return axios.get('http://localhost:4001/api/missinggames');
  },
  wlGames() {
    return axios.get('http://localhost:4001/api/missingwishlist');
  },
  saveGame(oldData, newData, list) {
    return axios.post('http://localhost:4001/api/saveGame', { oldData, newData, list });
  }
};