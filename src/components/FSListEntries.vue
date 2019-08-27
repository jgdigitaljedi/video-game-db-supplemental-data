<template>
  <v-card class="entries">
    <v-card-title>Entries Available in Files</v-card-title>
    <v-list>
      <v-list-item-group v-if="jointList">
        <v-list-item v-for="(item, i) in jointList" :key="i">{{item}}</v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'FSListEntries',
  props: ['jointList']
};
</script>

<style lang="scss">
.entries {
  height: 100%;
  max-height: 38rem;
  overflow-y: auto;
}
</style>