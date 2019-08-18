<template>
  <v-card class="search">
    <v-card-title d-flex>
      <div>IGDB Search</div>
      <v-spacer></v-spacer>
      <v-switch v-model="fuzzy" label="Fuzzy Search" :change="fuzzyToggle()"></v-switch>
    </v-card-title>
    <div class="search-results">
      <v-autocomplete
        label="Search Game Here"
        v-model="model"
        :items="games"
        :loading="isLoading"
        :search-input.sync="search"
        item-text="name"
        color="white"
        hide-no-data
        return-object
      ></v-autocomplete>
      <v-btn class="select-btn" @click="selectionMade()" color="primary" :disabled="!model">
        <v-icon dark left>mdi-check-bold</v-icon>Select Game
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import JsonData from "../services/jsonData.service";
import * as _debounce from "lodash/debounce";
export default {
  name: "IgdbSearch",
  props: {
    platform: null,
    reset: null
  },
  data: () => ({
    games: null,
    isLoading: false,
    search: null,
    model: null,
    fuzzy: true
  }),
  methods: {
    fuzzyToggle() {
      this.$emit("fuzzyToggle", this.fuzzy);
    },
    selectionMade() {
      console.log("this.model", this.model);
      const cleaned = {
        igdbId: this.model.id,
        name: this.model.name,
        genres: this.model.genres ? this.model.genres.map(g => g.name) : [],
        rating: this.model.total_rating,
        count: this.model.total_rating_count,
        release: this.model.first_release_date,
        esrb: this.model.esrb
      };
      this.$emit("gameData", cleaned);
    },
    searchIgdb(name, platform) {
      this.isLoading = true;
      if (this.fuzzy) {
        JsonData.fuzzy(name)
          .then(result => {
            console.log("results", result.data);
            this.games = result.data;
            this.isLoading = false;
          })
          .catch(error => {
            this.isLoading = false;
            console.warn("ERROR searching: ", error);
          });
      } else {
        JsonData.search(name, platform)
          .then(result => {
            console.log("results", result.data);
            this.games = result.data;
            this.isLoading = false;
          })
          .catch(error => {
            this.isLoading = false;
            console.warn("ERROR searching: ", error);
          });
      }
    }
  },
  watch: {
    search: _debounce(function(val) {
      if (val) {
        this.searchIgdb(val, this.platform);
      }
    }, 800),
    reset: function(val) {
      this.isLoading = false;
      this.games = null;
      this.search = null;
      this.model = null;
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