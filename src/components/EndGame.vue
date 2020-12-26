<template>
  <div align="center">
    <h1>Game over</h1>
    <v-row>
      <v-col lg12 v-for="(photo, index) in photos" :key="index">
          <div class="polaroid mt-15">
            <p>Snapshot {{ index + 1}}</p>
            <img :src="photo" height="250"/>
          </div>
      </v-col>
    </v-row>
    <div class="mt-10 mb-10">
      <v-btn class="mr-4" x-large @click="$emit('onboarding')">Back to Start</v-btn>
      <v-btn class="mr-4" x-large @click="$emit('start-game')">Play again</v-btn>
    </div>
    <Leaderboard />
  </div>
</template>

<script>
import Leaderboard from "@/components/Leaderboard";

export default {
  name: 'EndGame',
  components: { Leaderboard },
  props: {
    'photos' : Array
  },
  methods: {
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
