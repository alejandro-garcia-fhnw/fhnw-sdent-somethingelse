<template>
  <v-app>
    <div id="app">
      <div class="container">
        <h1 style="font-size: 5rem">something<span class="red--text">else 😉</span></h1>
        <div>
          <v-btn class="mr-2" x-large>Tutorial</v-btn>
          <v-btn class="ml-2" x-large>Start Game</v-btn>
        </div>

      </div>

    </div>
  </v-app>

</template>

<script>
export default {
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
