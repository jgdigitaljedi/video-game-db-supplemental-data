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

export default {
  name: 'FileSearch',
  data() {
    return {
      selectedFiles: null,
      filesList: null
    };
  },
  created() {}
};
</script>

<style lang="scss">
.file-search {
  padding: 1rem;
}
</style>