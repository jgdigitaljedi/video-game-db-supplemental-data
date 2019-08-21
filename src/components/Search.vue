<template>
  <v-card class="search">
    <v-card-title d-flex>
      <div>API Search</div>
      <v-spacer></v-spacer>
      <v-switch v-model="fuzzy" label="Fuzzy Search" :change="fuzzyToggle()"></v-switch>
    </v-card-title>
    <div class="search-results">
      <v-text-field v-model="search" label="Search Text"></v-text-field>
      <v-select
        label="IGDB results"
        v-model="igdbModel"
        :items="igdbGames"
        :loading="isIgdbLoading"
        item-text="name"
        color="white"
        hide-no-data
        return-object
      ></v-select>
      <v-select
        label="Giantbomb results"
        v-model="gbModel"
        :items="gbGames"
        :loading="isGbLoading"
        item-text="name"
        color="white"
        hide-no-data
        return-object
      ></v-select>
      <v-select
        label="TheGamesDB results"
        v-model="tgdbModel"
        :items="tgdbGames"
        :loading="isTgdbLoading"
        item-text="name"
        color="white"
        hide-no-data
        return-object
      ></v-select>
      <v-btn class="select-btn" @click="selectionMade()" color="primary" :disabled="!igdbModel">
        <v-icon dark left>mdi-check-bold</v-icon>
        Select {{fileType}}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import JsonData from '../services/jsonData.service';
import * as _debounce from 'lodash/debounce';
export default {
  name: 'Search',
  props: {
    platform: null,
    reset: null,
    fileType: null
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
    fuzzy: true
  }),
  methods: {
    fuzzyToggle() {
      this.$emit('fuzzyToggle', this.fuzzy);
    },
    getName() {
      let name;
      if (this.tgdbModel && this.tgdbModel.name) {
        name = this.tgdbModel.name;
      } else if (this.igdbModel && this.igdbModel.name) {
        name = this.igdbModel.name;
      } else if (this.gbModel && this.gbModel.name) {
        name = this.gbModel.name;
      } else {
        name = null;
      }
      return name;
    },
    selectionMade() {
      const cleaned = {
        igdbId: this.igdbModel && this.igdbModel.id ? this.igdbModel.id : null,
        gbId: this.gbModel && this.gbModel.gbId ? this.gbModel.gbId : null,
        gbGuid: this.gbModel && this.gbModel.gbGuid ? this.gbModel.gbGuid : null,
        tgdbId: this.tgdbModel && this.tgdbModel.tgdbId ? this.tgdbModel.tgdbId : null,
        name: this.getName()
      };
      this.$emit('gameData', cleaned);
    },
    searchAll(name, platform) {
      console.log('this.fileType', this.fileType);
      this.searchIgdb(name, platform);
      this.searchGb(name, platform);
      this.searchTgdb(name, platform);
    },
    searchGb(name, platform) {
      this.isGbLoading = true;
      if (this.fileType === 'Game') {
        JsonData.gbGameLookup(name, platform)
          .then(result => {
            console.log('gb result', result);
            this.gbGames = result.data;
            this.isGbLoading = false;
          })
          .catch(error => {
            this.isGbLoading = false;
            console.log('gb error', error);
          });
      } else {
        // @TODO: add gb platform search to API and here
        JsonData.gbPlatformLookup(name)
          .then(result => {
            this.gbGames = result.data;
            this.isGbLoading = false;
            console.log('gb platform result', result);
          })
          .catch(error => {
            console.log('gb platform error', error);
          });
      }
    },
    searchTgdb(name, platform) {
      this.isTgdbLoading = true;
      if (this.fileType === 'Game') {
      } else {
        JsonData.tgdbPlatformLookup(name)
          .then(result => {
            console.log('tgdb result', result);
            this.tgdbGames = result.data;
            this.isTgdbLoading = false;
          })
          .catch(error => {
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
              console.log('results', result.data);
              this.igdbGames = result.data;
              this.isIgdbLoading = false;
            })
            .catch(error => {
              this.isLoading = false;
              console.warn('ERROR searching: ', error);
            });
        } else {
          JsonData.igdbSearch(name, platform)
            .then(result => {
              console.log('results', result.data);
              this.igdbGames = result.data;
              this.isIgdbLoading = false;
            })
            .catch(error => {
              this.isLoading = false;
              console.warn('ERROR searching: ', error);
            });
        }
      } else {
        JsonData.igdbPlatform(name)
          .then(result => {
            console.log('igdb platform', result);
            this.igdbGames = result.data;
            this.isIgdbLoading = false;
          })
          .catch(error => {
            console.log('igdb platform error', error);
          });
      }
    }
  },
  watch: {
    search: _debounce(function(val) {
      if (val) {
        this.searchAll(val, this.platform);
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
    }
  }
};
</script>

<style lang="scss">
.search {
  .search-results {
    padding: 2rem;
  }
}
</style>