<template>
  <v-app id="app">
    <div class="container">
      <h1 style="font-size: 3rem">something<span class="red--text">else</span></h1>
      <Game v-if="lostRounds < 5" @photos="getPhotos"/>
      <EndGame v-if="lostRounds > 4" :photos="this.photos" @play-again="playAgain"/>
    </div>
  </v-app>
</template>

<script>
import Game from "./components/Game.vue";
import EndGame from "./components/EndGame.vue"

export default {
  name: "App",
  components: {
    EndGame,
    Game
  },
  data: () => ({
    photos: [],
    lostRounds: 0
  }),
  methods: {
    getPhotos(photos) {
      this.photos = photos
      this.lostRounds = this.photos.length
    },
    playAgain() {
      this.photos = null
      this.lostRounds = 0
    }
  }
};
</script>

<style>
#app {
  align-content: center;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5;
}
ul {
  list-style-type: none;
  padding: 0;
}
h2 {
  text-align: center;
}
.hidden {
  display: none;
}
.green {
  background-color: lightgreen;
}
.red {
  background-color: orangered;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
