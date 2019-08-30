<template>
  <div>
    <div class="file-selection">
      <v-combobox
        label="Files"
        v-model="selectedFile"
        return-object
        color="white"
        hide-no-data
        :items="fileList"
        item-text="title"
        class="file-select"
        v-on:change="emitType(selectedFile)"
        autocomplete="off"
      >
        <template v-slot:item="data">
          <v-icon left color="green" v-if="data.item.complete">mdi-check</v-icon>
          <v-icon left color="red" v-if="!data.item.complete">mdi-close</v-icon>
          {{data.item.title}}
        </template>
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
      </v-combobox>
      <div class="mode-text">
        <h4>Mode: {{selectedFile ? selectedFile.type : 'Not Set'}}</h4>
      </div>
    </div>
    <div class="actions">
      <v-btn
        color="primary"
        dark
        class="ma-2"
        v-on:click="markListComplete"
        v-if="selectedFile && !selectedFile.complete"
      >
        Mark as Complete &nbsp;
        <v-icon right>mdi-check</v-icon>
      </v-btn>
      <v-btn
        color="error"
        dark
        class="ma-2"
        v-on:click="markListIncomplete"
        v-if="selectedFile && selectedFile.complete"
      >
        Mark as Incomplete &nbsp;
        <v-icon right>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import jsonDataService from '../services/jsonData.service';
import * as _cloneDeep from 'lodash/cloneDeep';
import { mapMutations } from 'vuex';

export default {
  name: 'FileSelection',
  props: ['getList'],
  data: () => {
    return {
      fileList: [],
      selectedFile: null
    };
  },
  created() {
    this.getFileList();
  },
  methods: {
    snackTime(snack) {
      this.setSnack(snack);
    },
    emitType(file) {
      this.$emit('typeSet', file);
    },
    markListComplete() {
      this.$emit('listComplete', true);
    },
    markListIncomplete() {
      this.$emit('listComplete', false);
    },
    getFileList(oldSelection) {
      jsonDataService
        .getFile('static/fileInfoList.json')
        .then(result => {
          console.log('file list result', result);
          this.fileList = result.data.sort((a, b) => {
            if (a.complete) return 1;
            return -1;
          });
          if (oldSelection) {
            this.selectedFile = oldSelection;
          }
        })
        .catch(error => {
          console.log('file list ERROR', error);
          this.snackTime({ status: 'error', txt: 'ERROR FETCHING FILE LIST!' });
        });
    },
    ...mapMutations({
      setSnack: 'setSnack'
    })
  },
  watch: {
    getList: function(val) {
      const oldSelection = _cloneDeep(this.selectedFile);
      oldSelection.complete = !oldSelection.complete;
      this.selectedFile = null;
      this.fileList = [];
      this.getFileList(oldSelection);
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
