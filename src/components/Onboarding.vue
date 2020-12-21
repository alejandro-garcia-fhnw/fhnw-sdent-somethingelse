<template>
  <v-app>
    <div id="app">
      <div class="container" v-if="!showTutorial">
        <h1 style="font-size: 5rem">something<span class="red--text">else 😉</span></h1>
        <div>
          <v-btn @click="toggleTutorial" class="mr-2" x-large>Tutorial</v-btn>
          <v-btn @click="startGame" class="ml-2" x-large>Start Game</v-btn>
        </div>
      </div>
      <Tutorial v-if="showTutorial" @cancel="toggleTutorial" @start-game="startGame"/>
    </div>
  </v-app>
</template>

<script>
import Tutorial from "@/components/Tutorial";
export default {
  components: {Tutorial},
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
