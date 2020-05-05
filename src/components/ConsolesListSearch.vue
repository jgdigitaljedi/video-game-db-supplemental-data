<template>
  <v-card class="consoles-search">
    <v-card-title d-flex>Consoles Search</v-card-title>
    <div class="console-search__inputs" v-if="list && list.length">
      <div class="console-row" v-for="item in fieldList" :key="item.id">
        <v-text-field v-model="item.key" style="padding: 0 .5rem;" label="Type Field to Set"></v-text-field>
        <v-select
          :items="list"
          item-text="name"
          v-model="item.platform"
          label="Select Console"
          return-object
          style="padding: 0 .5rem;"
        ></v-select>
        <v-btn color="accent" @click="addField">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-btn color="primary" @click="saveData">Save Data to File</v-btn>
  </v-card>
</template>

<script>
import JsonData from '../services/jsonData.service';
import { mapMutations } from 'vuex';

export default {
  name: 'ConsolesSearch',
  props: ['currentList'],
  data() {
    return {
      list: null,
      fieldList: [{ key: null, platform: null, id: 0 }]
    };
  },
  created() {
    JsonData.getFile('static/consoleMasterList.json')
      .then(result => {
        this.list = result.data;
      })
      .catch(error => {
        console.log('console search ERROR', error);
        this.snackTime({ status: 'error', txt: 'ERROR FETCHING CONSOLE LIST!' });
      });
  },
  methods: {
    saveData() {
      const final = this.currentList.map(item => {
        this.fieldList.forEach(field => {
          if (item.hasOwnProperty(field.key) && Array.isArray(item[field.key])) {
            item[field.key].push(field.platform);
          } else if (item.hasOwnProperty(field.key) && !Array.isArray(item[field.key])) {
            item[field.key] = [item[field.key]];
            item[field.key].push(field.platform);
          } else {
            item[field.key] = field.platform;
          }
        });
        return item;
      });
      // @TODO: add save call here; want to think about data structure more before implementing
    },
    addField() {
      this.fieldList.push({ key: null, platform: null, id: this.fieldList.length });
    },
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
.consoles-search {
  padding: 1rem;
  .console-search__inputs {
    display: flex;
    flex-direction: column;
    .console-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
