<template>
  <v-card>
    <v-card-title>Current Game Data</v-card-title>
    <v-btn dark color="accent" @click.native="copyName">
      <v-icon left>mdi-content-copy</v-icon>Copy Name
    </v-btn>
    <div class="game-info">
      <h4>Old</h4>
      <pre :class="isComplete(game) ? 'complete-item' : ''">{{game ? game : ''}}</pre>
      <div class="game-fixed" v-if="fixed">
        <h4 style="color: yellow;">New</h4>
        <pre class="game-revisions">{{fixed ? fixed : ''}}</pre>
      </div>
      <div class="section-complete" v-if="!game">You reached the end of the list!</div>
    </div>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'GameInfo',
  props: {
    game: null,
    fixed: null,
    reset: null
  },
  methods: {
    isComplete(item) {
      return (
        item &&
        item.hasOwnProperty('igdbId') &&
        item.hasOwnProperty('tgdbId') &&
        item.hasOwnProperty('gbId') &&
        item.hasOwnProperty('gbGuid') &&
        item.name
      );
    },
    copyName() {
      this.setCurrentName(this.game.name ? this.game.name : this.game.title);
    },
    ...mapMutations({
      setCurrentName: 'setCurrentName'
    })
  }
};
</script>

<style lang="scss">
.game-info {
  padding: 0 2rem 2rem 2rem;
  pre {
    white-space: pre-wrap;
    &.complete-item {
      color: cyan;
    }
  }
  .game-fixed {
    margin-top: 1rem;
    .game-revisions {
      color: yellow;
    }
  }
  .section-complete {
    font-weight: bold;
    margin: 1.5rem;
    font-size: 2rem;
  }
}
</style>
