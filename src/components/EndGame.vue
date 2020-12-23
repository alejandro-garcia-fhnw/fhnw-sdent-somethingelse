<template>
  <div align="center">
    <h1>Game over</h1>
    <v-row>
      <v-col lg6>
        <v-card
            v-for="c in photos" :key="c"
            class="mx-auto"
            max-width="344"
        >
          <v-img
              :src="c"
              height="200"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>

    <div class="mt-10">
      <v-btn x-large @click="playAgain">Play again</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EndGame',
  props: {
    'photos' : Array
  },
  methods: {
    playAgain () {
      this.$emit('play-again');
    }
  }
}
</script>

<style scoped>

</style>
