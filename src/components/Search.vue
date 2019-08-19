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
        :loading="isgbLoading"
        item-text="name"
        color="white"
        hide-no-data
        return-object
      ></v-select>
      <v-select
        label="TheGamesDB results"
        v-model="tgdbModel"
        :items="tgdbGames"
        :loading="tsIgdbLoading"
        item-text="name"
        color="white"
        hide-no-data
        return-object
      ></v-select>
      <v-btn class="select-btn" @click="selectionMade()" color="primary" :disabled="!igdbModel">
        <v-icon dark left>mdi-check-bold</v-icon>Select Game
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
    reset: null
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
    selectionMade() {
      const cleaned = {
        igdbId: this.igdbModel.id,
        gbId: this.gbModel.id,
        gbGuid: this.gbModel.guid,
        tgdbId: this.tgdbModel.id,
        name: this.igdbModel.name
      };
      this.$emit('gameData', cleaned);
    },
    searchAll(name, platform) {
      this.searchIgdb(name, platofrm);
      this.searchGb(name, platofrm);
      this.searchTgdb(name, platofrm);
    },
    searchGb(name, platform) {},
    searchTgdb(name, platform) {},
    searchIgdb(name, platform) {
      this.isIgdbLoading = true;
      if (this.fuzzy) {
        JsonData.fuzzy(name)
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
        JsonData.search(name, platform)
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
      this.igdbGames = null;
      this.search = null;
      this.igdbModel = null;
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