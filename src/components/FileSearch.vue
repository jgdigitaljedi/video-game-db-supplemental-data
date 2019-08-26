<template>
  <v-card class="file-search">
    <v-card-title d-flex>Files Search</v-card-title>
    <v-select
      v-model="selectedFiles"
      :items="filesList"
      label="Select Files"
      multiple
      hint="Select files to search through"
      persistent-hint
    ></v-select>
  </v-card>
</template>

<script>
import JsonData from '../services/jsonData.service';
import { mapMutations } from 'vuex';

export default {
  name: 'FileSearch',
  data() {
    return {
      selectedFiles: null,
      filesList: null
    };
  },
  created() {
    JsonData.getFile('static/fileInfoList.json')
      .then(result => {
        this.fileList - result.data;
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
    ...mapMutations({
      setSnack: 'setSnack'
    })
  }
};
</script>

<style lang="scss">
.file-search {
  padding: 1rem;
}
</style>