<template>
  <v-app>
    <div id="app">
      <div class="container" v-if="!showTutorial">
        <h1 style="font-size: 5rem">something<span class="red--text">else 😉</span></h1>
        <div>
          <v-btn @click="toggleTutorial" class="mr-2" x-large>Tutorial</v-btn>
          <v-btn @click="startGame" class="ml-2" x-large>Start Game</v-btn>
        </div>
        <div class="container mt-16">
          <lottie-animation :width="50"
                            :height="50"
                            path="animations/face.json"
          />
          <p class="mt-5" style="size: 8rem">Please allow <span style="font-weight: bold">something<span class="red--text">else</span></span> to access your camera</p>
          <v-footer>
            <vue-typed-js :loop="true" :typeSpeed="70" :strings="['We do not use your images in any kind, promised!', 'We do not store your images in any kind, promised!']">
              <p class="mt-5 typing" style="size: 8rem; color: #2c3e50"></p>
            </vue-typed-js>
          </v-footer>
        </div>
      </div>
      <Tutorial v-if="showTutorial" @cancel="toggleTutorial" @start-game="startGame"/>
    </div>
  </v-app>
</template>

<script>
import Tutorial from "@/components/Tutorial";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

export default {
  components: {
    Tutorial,
    LottieAnimation
  },
  methods: {
    startGame () {
      this.$emit('start-game')
    },
    toggleTutorial () {
      this.showTutorial = !this.showTutorial
    }
  },
  data () {
    return {
      showTutorial : false
    }
  },
name: "Onboarding"
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
