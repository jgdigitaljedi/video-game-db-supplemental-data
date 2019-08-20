<template>
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
      v-on:change="emitType(selectedFile.type)"
    ></v-select>
    <div class="mode-text">
      <h4>Mode: {{selectedFile ? selectedFile.type : 'Not Set'}}</h4>
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
    emitType(type) {
      this.$emit('typeSet', type);
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
