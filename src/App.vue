<template>
  <v-app>
    <Notification></Notification>
    <v-layout class="app-wrapper">
      <v-container class="app-left">
        <v-card class="selection-card game-card">
          <v-card-title>List Selection</v-card-title>
          <FileSelection
            v-on:typeSet="typeSet"
            v-on:listComplete="listComplete"
            :getList="pullFileList"
          ></FileSelection>
        </v-card>
        <v-card class="next-and-previous game-card">
          <v-btn color="primary" @click="changeGame(false)" :disabled="currentIndex === 0">
            <v-icon dark left>mdi-arrow-left</v-icon>
            Previous {{fileType}}
          </v-btn>
          <v-btn color="primary" @click="changeGame(true)">
            Next {{fileType}}
            <v-icon dark right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card>
        <Search
          :platform="selected"
          v-on:gameData="gameSelected"
          class="game-card"
          :reset="reset"
          v-on:fuzzyToggle="fuzzyToggled"
          :fileType="fileType"
          :currentGame="currentGame"
        ></Search>
        <v-card class="save-game">
          <v-btn color="success" @click="saveGame()" :disabled="!fixedGame">
            <v-icon dark left>mdi-content-save</v-icon>
            Save {{fileType}}
          </v-btn>
          <v-btn color="warning" @click="clearGame()">
            <v-icon dark left>mdi-close</v-icon>
            Clear {{fileType}} Data
          </v-btn>
        </v-card>
      </v-container>
      <v-container class="app-right">
        <GameInfo :game="currentGame" :fixed="fixedGame" class="game-card" :reset="reset"></GameInfo>
      </v-container>
    </v-layout>
  </v-app>
</template>

<script>
import GameInfo from './components/GameInfo';
import FileSelection from './components/FileSelection';
import Search from './components/Search';
import Notification from './components/Notification';
import JsonData from './services/jsonData.service';
import * as _cloneDeep from 'lodash/cloneDeep';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    GameInfo,
    Search,
    FileSelection,
    Notification
  },
  data: () => ({
    selected: null,
    currentList: null,
    currentGame: null,
    fixedGame: null,
    currentIndex: 0,
    reset: 0,
    fileInfo: null,
    fileType: '',
    pullFileList: 0
  }),
  created() {
    this.selected = 'games';
    // this.getList('games');
  },
  methods: {
    snackTime(snack) {
      this.setSnack(snack);
    },
    listComplete(status) {
      const newStatus = status ? 'yes' : 'no';
      JsonData.markListStatus(this.fileInfo, newStatus)
        .then(result => {
          console.log('list status call result', result);
          if (result && result.data) {
            this.pullFileList++;
            this.snackTime({
              status: 'success',
              txt: `File marked as ${status ? 'complete' : 'incomplete'}!`
            });
          }
        })
        .catch(error => {
          console.log('list status call ERROR', error);
          this.snackTime({ status: 'error', txt: 'ERROR MARKING FILE!' });
        });
    },
    getFile(data) {
      console.log('data', data);
      JsonData.getFile(data.filePath)
        .then(result => {
          console.log('file result', result);
          this.currentList = result.data;
          this.currentGame = result.data[this.currentIndex];
          this.fixedGame = null;
        })
        .catch(error => {
          console.log('file error', error);
        });
    },
    typeSet(file) {
      this.fileInfo = file;
      this.fileType = file.type;
      this.currentIndex = 0;
      this.getFile(file);
    },
    fuzzyToggled(fuzzy) {
      this.fuzzy = fuzzy;
    },
    saveGame() {
      JsonData.saveFile(this.fixedGame, this.fileInfo)
        .then(result => {
          console.log('save result', result);
          this.currentIndex++;
          this.getList(this.selected);
          this.reset++;
          this.snackTime({ status: 'success', txt: 'File Saved!' });
        })
        .catch(error => {
          this.snackTime({ status: 'error', txt: 'ERROR SAVING FILE!' });
          console.warn('ERROR SAVING: ', error);
        });
    },
    clearGame() {
      this.fixedGame = null;
    },
    changeGame(next) {
      if (next) {
        this.currentIndex++;
      } else if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      this.currentGame = this.currentList[this.currentIndex];
    },
    gameSelected(gameData) {
      console.log('gameData', gameData);
      const gCopy = _cloneDeep(this.currentGame);
      gCopy.igdbId = gameData.igdbId;
      gCopy.gbId = gameData.gbId;
      gCopy.gbGuid = gameData.gbGuid;
      gCopy.tgdbId = gameData.tgdbId;
      gCopy.name = gameData.name;
      this.fixedGame = gCopy;
    },
    changeList(list) {
      this.selected = list;
      this.getList(list);
      this.currentIndex = 0;
      this.fixedGame = null;
    },
    getList(which) {
      JsonData.getFile(this.fileInfo.filePath)
        .then(result => {
          this.currentList = result.data;
          this.currentGame = result.data[this.currentIndex];
          this.fixedGame = null;
        })
        .catch(error => {
          this.snackTime({ status: 'error', txt: 'ERROR FETCHING FILE LIST!' });
          console.warn('ERROR:', error);
        });
    },
    ...mapMutations({
      setSnack: 'setSnack'
    })
  }
};
</script>

<style lang="scss">
.app-wrapper {
  margin: 3rem auto 0;
  display: flex;
  justify-content: center;
  width: 100%;
  .game-card {
    margin-bottom: 2rem;
  }
  .selection-card {
    .selection-button {
      margin-right: 1rem;
    }
  }
  .next-and-previous,
  .save-game {
    display: flex;
    justify-content: space-between;
  }
}
</style>