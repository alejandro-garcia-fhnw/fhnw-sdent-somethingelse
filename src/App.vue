<template>
  <v-app id="app">
    <Game />
  </v-app>
</template>

<script>
import Game from "./components/Game.vue";

export default {
  name: "App",
  components: {
    Game
  }
};
</script>

<style>
#app {
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
</style>
