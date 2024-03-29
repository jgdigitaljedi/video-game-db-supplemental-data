<template>
  <v-app style="height: 100%;" d-flex>
    <Notification></Notification>
    <v-layout class="app-wrapper" style="height: 100%;" d-flex>
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
          <v-btn color="primary" @click="changeGame(-1)" :disabled="currentIndex === 0">
            <v-icon dark left>mdi-arrow-left</v-icon>
            Previous {{ fileType }}
          </v-btn>
          <v-btn color="warning" @click="changeGame(-10)" :disabled="currentIndex < 10">
            <v-icon left>mdi-rewind</v-icon>Back 10
          </v-btn>
          <v-btn color="warning" @click="changeGame(10)">
            Forward 10
            <v-icon right>mdi-fast-forward</v-icon>
          </v-btn>
          <v-btn color="primary" @click="changeGame(1)">
            Next {{ fileType }}
            <v-icon dark right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card>
        <v-card class="game-card" style="padding: 1rem;">
          <v-select
            label="Search Source"
            :items="['API Search', 'Files Search', 'Consoles List Search']"
            v-model="searchSource"
          ></v-select>
        </v-card>
        <FileSearch
          v-if="searchSource === 'Files Search'"
          v-on:gameData="gameSelected"
          v-on:jointList="getJointList"
        ></FileSearch>
        <ConsolesSearch
          v-if="searchSource === 'Consoles List Search'"
          :currentList="currentList"
        ></ConsolesSearch>
        <Search
          :platform="selected"
          v-on:gameData="gameSelected"
          class="game-card"
          :reset="reset"
          v-on:fuzzyToggle="fuzzyToggled"
          :fileType="fileType"
          :currentGame="currentGame"
          :fuzzyList="fileInfo ? fileInfo.fuzzy : false"
          v-if="searchSource === 'API Search'"
        ></Search>
        <v-card class="save-game">
          <v-btn color="success" @click="saveGame()" :disabled="!fixedGame">
            <v-icon dark left>mdi-content-save</v-icon>
            Save {{ fileType }}
          </v-btn>
          <v-btn color="warning" @click="clearGame()">
            <v-icon dark left>mdi-close</v-icon>
            Clear {{ fileType }} Data
          </v-btn>
        </v-card>
      </v-container>
      <v-container class="app-right" style="height: 100%;">
        <GameInfo
          :game="currentGame"
          :fixed="fixedGame"
          class="game-card"
          :reset="reset"
          :index="currentIndex + 1"
          :total="currentList ? currentList.length : 0"
        ></GameInfo>
        <FSListEntries :jointList="jointList" v-if="jointList"></FSListEntries>
      </v-container>
    </v-layout>
  </v-app>
</template>

<script>
import GameInfo from './components/GameInfo';
import FileSelection from './components/FileSelection';
import Search from './components/Search';
import Notification from './components/Notification';
import FileSearch from './components/FileSearch';
import FSListEntries from './components/FSListEntries';
import ConsolesSearch from './components/ConsolesListSearch';
import JsonData from './services/jsonData.service';
import * as _cloneDeep from 'lodash/cloneDeep';
import * as _uniq from 'lodash/uniq';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    GameInfo,
    Search,
    FileSelection,
    Notification,
    FileSearch,
    FSListEntries,
    ConsolesSearch
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
    pullFileList: 0,
    searchSource: 'API Search',
    jointList: null
  }),
  created() {
    this.selected = 'games';
    // this.getList('games');
  },
  methods: {
    snackTime(snack) {
      this.setSnack(snack);
    },
    gameFullData(fullData) {
      this.setGameFullData(fullData);
    },
    getJointList(files) {
      JsonData.jointList(files)
        .then(result => {
          this.jointList = _uniq(result.data);
        })
        .catch(error => {
          console.log('joint list error', error);
          this.snackTime({ status: 'error', text: 'ERROR FETCHING JOINT LIST!' });
        });
    },
    listComplete(status) {
      this.jointList = null;
      const newStatus = status ? 'yes' : 'no';
      JsonData.markListStatus(this.fileInfo, newStatus)
        .then(result => {
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
      JsonData.getFile(data.filePath)
        .then(result => {
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
      this.gameFullData(!!file.fullData);
      this.getFile(file);
    },
    fuzzyToggled(fuzzy) {
      this.fuzzy = fuzzy;
    },
    saveGame() {
      JsonData.saveFile(this.fixedGame, this.fileInfo)
        .then(result => {
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
    changeGame(amount) {
      this.currentIndex = this.currentIndex + amount;
      // if (next) {
      //   this.currentIndex++;
      // } else if (this.currentIndex > 0) {
      //   this.currentIndex--;
      // }
      this.currentGame = this.currentList[this.currentIndex];
    },
    gameSelected(gameData) {
      if (this.$store.state.gameFullData) {
        this.fixedGame = gameData;
        this.fixedGame.id = this.currentGame.id;
      } else {
        const gCopy = _cloneDeep(this.currentGame);
        gCopy.igdbId = gameData.igdbId;
        gCopy.gbId = gameData.gbId;
        gCopy.gbGuid = gameData.gbGuid;

        // commented this out on 11/7 when I decided to drop support for tgdb
        // gCopy.tgdbId = gameData.tgdbId;

        gCopy.name = gameData.name;
        this.fixedGame = gCopy;
      }
    },
    changeList(list) {
      this.selected = list;
      this.getList(list);
      this.currentIndex = 0;
      this.fixedGame = null;
      this.jointList = null;
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
      setSnack: 'setSnack',
      setGameFullData: 'setGameFullData'
    })
  }
};
</script>

<style lang="scss">
.app-wrapper {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  .game-card {
    margin-bottom: 1rem;
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
