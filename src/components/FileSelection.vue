<template>
  <div>
    <div class="file-selection">
      <v-select
        label="Files"
        v-model="selectedFile"
        return-object
        color="white"
        hide-no-data
        :items="fileList"
        item-text="title"
        class="file-select"
        v-on:change="emitType(selectedFile)"
      >
        <v-icon
          slot="prepend-inner"
          v-if="selectedFile && selectedFile.complete"
          style="color: green;"
        >mdi-check</v-icon>
        <v-icon
          slot="prepend-inner"
          v-if="selectedFile && !selectedFile.complete"
          style="color: red;"
        >mdi-close</v-icon>
      </v-select>
      <!-- :prepend-inner-icon="selectedFile ? (selectedFile.complete ? 'mdi-check' : 'mdi-close') : null" -->
      <div class="mode-text">
        <h4>Mode: {{selectedFile ? selectedFile.type : 'Not Set'}}</h4>
      </div>
    </div>
    <div class="actions">
      <v-btn color="primary" dark class="ma-2" :click="markListComplete">
        Mark as Complete &nbsp;
        <v-icon right>mdi-check</v-icon>
      </v-btn>
      <v-btn color="error" dark class="ma-2" :click="markListIncomplete">
        Mark as Incomplete &nbsp;
        <v-icon right>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import InfoService from '../services/info.service';

export default {
  name: 'FileSelection',
  data: () => {
    return {
      fileList: [],
      selectedFile: null
    };
  },
  created() {
    this.fileList = InfoService.fileInfo();
  },
  methods: {
    emitType(file) {
      this.$emit('typeSet', file);
    },
    markListComplete() {
      this.$emit('listComplete', true);
    },
    markListIncomplete() {
      this.$emit('listComplete', false);
    }
  }
};
</script>

<style lang="scss">
.file-selection {
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .file-select {
    margin-right: 3rem;
  }
}
</style>
