<template>
  <v-snackbar v-model="show" :top="true" :color="status">
    <b>{{message}}</b>
    <v-btn text small @click.native="show = false">
      <v-icon left>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      status: ''
    };
  },
  created() {
    this.$store.watch(
      state => {
        return state.snack;
      },
      val => {
        console.log('val', val);
        const msg = val.txt;
        if (msg !== '') {
          this.show = true;
          switch (val.status) {
            case 'success':
              this.status = 'green';
              break;
            case 'error':
              this.status = 'red';
              break;
            case 'info':
              this.status = 'blue';
              break;
            default:
              this.status = null;
          }
          this.status = val.status;

          this.message = msg;
          this.$store.commit('setSnack', { status: '', txt: '' });
        }
      },
      {
        deep: true
      }
    );
  }
};
</script>