<template>
  <v-app id="app">
    <div class="container">
      <Onboarding v-if="onboarding" @start-game="onboarding = false"/>
      <Game v-if="!onboarding && lostRounds < 6" @photos="getPhotos"/>
      <EndGame v-if="!onboarding && lostRounds > 5" :photos="this.photos" @play-again="playAgain"/>
    </div>
  </v-app>
</template>

<script>
import Game from "./components/Game.vue";
import EndGame from "./components/EndGame.vue"
import Onboarding from "@/components/Onboarding";

export default {
  name: "App",
  components: {
    Onboarding,
    EndGame,
    Game
  },
  data: () => ({
    photos: [],
    lostRounds : 0,
    onboarding : true
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
