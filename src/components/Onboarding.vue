<template>
  <v-app>
    <div id="app">
      <h1 class="text-h1 font-weight-bold mb-16">
        something<span class="red--text">else 😉</span>
      </h1>
      <div v-if="hasVideoAccess">
        <v-btn class="mr-2" x-large @click="$emit('start-tutorial')">
          Tutorial
        </v-btn>
        <v-btn class="ml-2" x-large @click="$emit('start-game')">
          Start Game
        </v-btn>
      </div>
      <div class="container" v-if="!hasVideoAccess">
        <lottie-animation class="mb-4" :width="50" :height="50" path="animations/face.json"/>
        <p>
          Please allow
          <span class="font-weight-bold">something<span class="red--text">else</span>
          </span>
          to access your camera. Page reloads every 10 seconds ...
        </p>
        <vue-typed-js :loop="true" :typeSpeed="50" :strings="['We do not use your images in any kind, promised!', 'We do not store your images in any kind, promised!']">
          <p class="mt-5 typing"></p>
        </vue-typed-js>
      </div>
      <Leaderboard class="mt-8"/>
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
    hasVideoAccess: false
  }),
  mounted () {
    navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia;
    navigator.getUserMedia({ video: true },
      stream => this.hasVideoAccess = true,
      err => {
        setTimeout(() => window.location.reload(), 10000);
        console.error(err);
      }
    );
  },
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
