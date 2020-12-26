<template>
  <v-app>
    <div id="app">
      <h1 style="font-size: 5rem">something<span class="red--text">else 😉</span></h1>
      <div class="mt-8">
        <v-btn class="mr-2" x-large
            @click="$emit('start-tutorial')">
          Tutorial
        </v-btn>
        <v-btn class="ml-2" x-large
            @click="$emit('start-game')">
          Start Game
        </v-btn>
      </div>
      <div class="container mt-8">
        <lottie-animation :width="50" :height="50" path="animations/face.json"/>
        <p class="mt-5" style="size: 8rem">Please allow <span style="font-weight: bold">something<span class="red--text">else</span></span> to access your camera</p>
        <v-footer>
          <vue-typed-js :loop="true" :typeSpeed="70" :strings="['We do not use your images in any kind, promised!', 'We do not store your images in any kind, promised!']">
            <p class="mt-5 typing" style="size: 8rem; color: #2c3e50"></p>
          </vue-typed-js>
        </v-footer>
      </div>
      <Leaderboard />
    </div>
  </v-app>
</template>

<script>
import Leaderboard from "@/components/Leaderboard";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

export default {
  name: 'Onboarding',
  components: { Leaderboard, LottieAnimation },
  data: () => ({
  }),
  methods: {
  }
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
