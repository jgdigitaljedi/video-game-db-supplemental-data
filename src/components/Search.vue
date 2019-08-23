<template>
  <v-card class="search">
    <v-card-title d-flex>
      <div>API Search</div>
      <v-spacer></v-spacer>
      <v-select
        v-if="fileType === 'Game'"
        label="Platform"
        :items="platformList"
        item-text="name"
        v-model="selectedPlatform"
        color="white"
        return-object
      ></v-select>
      <v-switch v-model="fuzzy" label="Fuzzy Search" :change="fuzzyToggle()"></v-switch>
    </v-card-title>
    <div class="search-results">
      <v-text-field v-model="search" label="Search Text"></v-text-field>
      <div class="search-row">
        <v-switch v-model="runIgdb"></v-switch>
        <v-select
          label="IGDB results"
          v-model="igdbModel"
          :items="igdbGames"
          :loading="isIgdbLoading"
          item-text="name"
          color="white"
          hide-no-data
          return-object
          :disabled="!runIgdb"
          :change="canSelectionHappen"
        ></v-select>
      </div>
      <div class="search-row">
        <v-switch v-model="runGb"></v-switch>
        <v-select
          label="Giantbomb results"
          v-model="gbModel"
          :items="gbGames"
          :loading="isGbLoading"
          item-text="name"
          color="white"
          hide-no-data
          return-object
          :disabled="!runGb"
          :change="canSelectionHappen"
        ></v-select>
      </div>
      <div class="search-row">
        <v-switch v-model="runTgdb"></v-switch>
        <v-select
          label="TheGamesDB results"
          v-model="tgdbModel"
          :items="tgdbGames"
          :loading="isTgdbLoading"
          item-text="name"
          color="white"
          hide-no-data
          return-object
          :disabled="!runTgdb"
          :change="canSelectionHappen"
        ></v-select>
      </div>
      <v-btn class="select-btn" @click="selectionMade()" color="primary" :disabled="readyForSave">
        <v-icon dark left>mdi-check-bold</v-icon>
        Select {{fileType}}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import JsonData from '../services/jsonData.service';
import * as _debounce from 'lodash/debounce';
import { mapMutations } from 'vuex';

export default {
  name: 'Search',
  props: {
    platform: null,
    reset: null,
    fileType: null,
    currentGame: null
  },
  data: () => ({
    igdbGames: null,
    gbGames: null,
    tgdbGames: null,
    isIgdbLoading: false,
    isGbLoading: false,
    isTgdbLoading: false,
    search: null,
    igdbModel: null,
    gbModel: null,
    tgdbModel: null,
    fuzzy: false,
    platformList: null,
    selectedPlatform: null,
    runIgdb: true,
    runTgdb: true,
    runGb: true,
    readyForSave: false
  }),
  created() {
    JsonData.getMasterPlatforms()
      .then(result => {
        console.log('platforms result', result);
        this.platformList = result.data.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        this.selectedPlatform = this.platformList[0];
      })
      .catch(error => {
        console.log('platforms error', error);
      });
  },
  methods: {
    canSelectionHappen() {
      const igdb = !this.runIgdb ? true : !!this.igdbModel;
      const gb = !this.runGb ? true : !!this.gbModel;
      const tgdb = !this.runTgdb ? true : !!this.tgdbModel;
      this.readyForSave = igdb && gb && tgdb;
    },
    snackTime(snack) {
      this.setSnack(snack);
    },
    fuzzyToggle() {
      this.$emit('fuzzyToggle', this.fuzzy);
    },
    getName() {
      let name;
      if (this.tgdbModel && this.tgdbModel.name && this.tgdbModel.name !== 'not found in DB') {
        name = this.tgdbModel.name;
      } else if (
        this.igdbModel &&
        this.igdbModel.name &&
        this.igdbModel.name !== 'not found in DB'
      ) {
        name = this.igdbModel.name;
      } else if (this.gbModel && this.gbModel.name && this.gbModel.name !== 'not found in DB') {
        name = this.gbModel.name;
      } else if (this.currentGame.name) {
        return this.currentGame.name;
      } else {
        name = null;
      }
      return name;
    },
    getFromCurrentData(which) {
      if (this.currentGame[which]) {
        return this.currentGame[which];
      }
      return null;
    },
    selectionMade() {
      const cleaned = {
        igdbId:
          this.igdbModel && this.igdbModel.id
            ? this.igdbModel.id
            : this.getFromCurrentData('igdbId'),
        gbId:
          this.gbModel && this.gbModel.gbId ? this.gbModel.gbId : this.getFromCurrentData('gbId'),
        gbGuid:
          this.gbModel && this.gbModel.gbGuid
            ? this.gbModel.gbGuid
            : this.getFromCurrentData('gbGuid'),
        tgdbId:
          this.tgdbModel && this.tgdbModel.tgdbId
            ? this.tgdbModel.tgdbId
            : this.getFromCurrentData('tgdbId'),
        name: this.getName()
      };
      this.$emit('gameData', cleaned);
    },
    searchAll(name, platform) {
      if (this.runIgdb) {
        this.searchIgdb(name, platform);
      }
      if (this.runGb) {
        this.searchGb(name, platform);
      }
      if (this.runTgdb) {
        this.searchTgdb(name, platform);
      }
    },
    searchGb(name, platform) {
      this.isGbLoading = true;
      if (this.fileType === 'Game') {
        JsonData.gbGameLookup(name, this.fuzzy ? null : platform.gbId)
          .then(result => {
            const list = result.data;
            list.unshift({ name: 'not found in DB', gbId: null, gbGuid: null });
            this.gbGames = list;
            this.isGbLoading = false;
          })
          .catch(error => {
            this.isGbLoading = false;
            this.snackTime({ status: 'error', txt: 'ERROR FETCHING GB GAME DATA!' });
            console.log('gb error', error);
          });
      } else {
        JsonData.gbPlatformLookup(name)
          .then(result => {
            const list = result.data;
            list.unshift({ name: 'not found in DB', gbId: null, gbGuid: null });
            this.gbGames = list;
            this.isGbLoading = false;
            console.log('gb platform result', result);
          })
          .catch(error => {
            this.snackTime({ status: 'error', txt: 'ERROR FETCHING GB PLATFORM DATA!' });
            console.log('gb platform error', error);
          });
      }
    },
    searchTgdb(name, platform) {
      this.isTgdbLoading = true;
      if (this.fileType === 'Game') {
        JsonData.tgdbGameLookup(name, this.fuzzy ? null : platform.tgdbId)
          .then(result => {
            const list = result.data;
            list.unshift({ name: 'not found in DB', tgdbId: null });
            this.tgdbGames = list;
            this.isTgdbLoading = false;
            console.log('tgdb result', result);
          })
          .catch(error => {
            this.isTgdbLoading = false;
            this.snackTime({ status: 'error', txt: 'ERROR FETCHING TGDB PLATFORM DATA!' });
            console.log('tgdb error', error);
          });
      } else {
        JsonData.tgdbPlatformLookup(name)
          .then(result => {
            const list = result.data;
            list.unshift({ name: 'not found in DB', tgdbId: null });
            this.tgdbGames = list;
            this.isTgdbLoading = false;
          })
          .catch(error => {
            this.snackTime({ status: 'error', txt: 'ERROR FETCHING TGDB PLATFORM DATA!' });
            console.log('tgdb error', error);
            this.isTgdbLoading = false;
          });
      }
    },
    searchIgdb(name, platform) {
      this.isIgdbLoading = true;
      if (this.fileType === 'Game') {
        if (this.fuzzy) {
          JsonData.igdbGameFuzzy(name)
            .then(result => {
              const list = result.data;
              list.unshift({ name: 'not found in DB', igdbId: null });
              this.igdbGames = list;
              this.isIgdbLoading = false;
            })
            .catch(error => {
              this.isLoading = false;
              this.snackTime({ status: 'error', txt: 'ERROR FETCHING IGDB GAME DATA!' });
              console.warn('ERROR searching: ', error);
            });
        } else {
          JsonData.igdbGameLookup(name, platform.igdbId)
            .then(result => {
              const list = result.data;
              list.unshift({ name: 'not found in DB', igdbId: null });
              this.igdbGames = list;
              this.isIgdbLoading = false;
            })
            .catch(error => {
              this.isLoading = false;
              this.snackTime({ status: 'error', txt: 'ERROR FETCHING IGDB GAME DATA!' });
              console.warn('ERROR searching: ', error);
            });
        }
      } else {
        JsonData.igdbPlatform(name)
          .then(result => {
            const list = result.data;
            list.unshift({ name: 'not found in DB', igdbId: null });
            this.igdbGames = list;
            this.isIgdbLoading = false;
          })
          .catch(error => {
            this.snackTime({ status: 'error', txt: 'ERROR FETCHING IGDB PLATFORM DATA!' });
            console.log('igdb platform error', error);
          });
      }
    },
    ...mapMutations({
      setSnack: 'setSnack'
    })
  },
  watch: {
    search: _debounce(function(val) {
      if (val) {
        this.searchAll(val, this.selectedPlatform);
      }
    }, 800),
    reset: function(val) {
      this.isIgdbLoading = false;
      this.isGbLoading = false;
      this.isTgdbLoading = false;
      this.igdbGames = null;
      this.gbGames = null;
      this.tgdbGames = null;
      this.search = null;
      this.igdbModel = null;
      this.gbModel = null;
      this.tgdbModel = null;
      this.runIgdb = true;
      this.runGb = true;
      this.runTgdb = true;
      this.fuzzy = false;
    }
  }
};
</script>

<style lang="scss">
.search {
  .search-results {
    padding: 2rem;
    .search-row {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>