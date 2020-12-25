<template>
  <div align="center">
    <h1>Game over</h1>
    <v-row>
      <v-col lg12 v-for="(photo, index) in photos" :key="c">

          <div class="polaroid mt-15">
            <p>Snapshot {{ index + 1}}</p>
            <img :src="photo" height="250"/>
          </div>

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
.polaroid {
  position: relative;
  width: 320px;
}

.polaroid img {
  border: 10px solid #fff;
  border-bottom: 45px solid #fff;
  -webkit-box-shadow: 3px 3px 3px #777;
  -moz-box-shadow: 3px 3px 3px #777;
  box-shadow: 3px 3px 3px #777;
}

.polaroid p {
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 0px;
  font: 400 18px/1 'Kaushan Script', cursive;
  color: #888;
}
</style>
