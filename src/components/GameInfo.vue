<template>
  <v-card class="info-card">
    <v-card-title>Current Game Data</v-card-title>
    <v-btn dark color="accent" @click.native="copyName">
      <v-icon left>mdi-content-copy</v-icon>Copy Name
    </v-btn>
    <v-btn dark color="primary" @click.native="copyBeforeColon">
      <v-icon left>mdi-clipboard-arrow-left</v-icon>Copy Name Before Colon
    </v-btn>
    <v-btn dark color="warning" @click.native="copyAfterColon">
      <v-icon left>mdi-clipboard-arrow-right</v-icon>Copy Name After Colon
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
import { parens } from 'stringman';

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
        // item.hasOwnProperty('tgdbId') &&
        item.hasOwnProperty('gbId') &&
        item.hasOwnProperty('gbGuid') &&
        item.name
      );
    },
    stripName(name) {
      // remove parenthesis and non ascii characters
      const noParens = parens.remove(name);

      // @TODO: add a bit that removes the non-ascii characters and replaces with the ascii equivalent
      return noParens;
    },
    copyName() {
      this.setCurrentName(
        this.game.name ? this.stripName(this.game.name) : this.stripName(this.game.title)
      );
    },
    copyBeforeColon() {
      const before = this.game.name
        ? this.stripName(this.game.name.split(':')[0])
        : this.stripName(this.game.title.split(':')[0]);
      this.setCurrentName(before);
    },
    copyAfterColon() {
      const after = this.game.name
        ? this.stripName(this.game.name.split(':')[1])
        : this.stripName(this.game.title.split(':')[1]);
      this.setCurrentName(after);
    },
    ...mapMutations({
      setCurrentName: 'setCurrentName'
    })
  }
};
</script>

<style lang="scss">
.info-card {
  button {
    margin-right: 1rem;
  }
}
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
