<template>
  <v-card class="file-search">
    <v-card-title d-flex>Files Search</v-card-title>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <v-combobox
        v-model="selectedFiles"
        :items="filesList"
        label="Select Files"
        multiple
        item-text="title"
        return-object
        hint="Select files to search through"
        persistent-hint
      ></v-combobox>
      <v-btn color="primary" @click="getJointList">
        <v-icon left>mdi-format-list-bulleted</v-icon>Generate List
      </v-btn>
    </div>
    <div class="search-results">
      <div class="search-row">
        <div style="width: 85%;">
          <v-text-field v-model="search" label="Search Text"></v-text-field>
        </div>
        <div>
          <v-btn color="accent" @click.native="runSearch">
            <v-icon left>mdi-magnify</v-icon>Search
          </v-btn>
        </div>
      </div>
      <div class="search-row">
        <v-select
          label="File Search Results"
          v-model="selectedResult"
          :items="searchResults"
          :loading="isLoading"
          item-text="name"
          color="white"
          hide-no-data
          return-object
          @change="resultSelected"
        ></v-select>
      </div>
    </div>
  </v-card>
</template>

<script>
import JsonData from '../services/jsonData.service';
import { mapMutations } from 'vuex';

export default {
  name: 'FileSearch',
  data() {
    return {
      selectedFiles: [],
      filesList: [],
      search: '',
      isLoading: false,
      selectedResult: null,
      searchResults: []
    };
  },
  created() {
    JsonData.getFile('static/fileInfoList.json')
      .then(result => {
        console.log('filSearch result', result);
        this.filesList = result.data;
      })
      .catch(error => {
        console.log('file list ERROR', error);
        this.snackTime({ status: 'error', txt: 'ERROR FETCHING FILE LIST!' });
      });
  },
  methods: {
    snackTime(snack) {
      this.setSnack(snack);
    },
    getJointList() {
      this.$emit('jointList', this.selectedFiles);
    },
    resultSelected() {
      console.log('resultSelected', this.selectedFiles.filter(f => typeof f !== 'string'));
      const cleaned = {
        igdbId: this.selectedResult.igdbId,
        gbId: this.selectedResult.gbId,
        gbGuid: this.selectedResult.gbGuid,
        tgdbId: this.selectedResult.tgdbId,
        name: this.selectedResult.name
      };
      this.$emit('gameData', cleaned);
    },
    runSearch() {
      console.log('this.selectedFiles', this.selectedFiles);
      const sf = this.selectedFiles.filter(f => typeof f !== 'string');
      JsonData.searchFiles(sf, this.search)
        .then(result => {
          if (result && result.data) {
            this.searchResults = result.data;
          }
        })
        .catch(error => {
          console.log('file search error', error);
          this.snackTime({ status: 'error', text: 'ERROR SEARCHING THROUGH FILES!' });
        });
    },
    ...mapMutations({
      setSnack: 'setSnack'
    })
  }
};
</script>

<style lang="scss">
.file-search {
  padding: 1rem;
  .search-results {
    // padding: 2rem;
    .search-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>