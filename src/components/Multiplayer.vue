<template>
  <div id="game" ref="game">
    <h1 style="cursor: pointer" @click="$emit('stop-multiplayer-game')" class="text-h3 font-weight-bold mb-8">
      something<span class="red--text">else</span> - Multiplayer
    </h1>

<!--    Entry Point-->
    <div v-if="this.step === 'start'">
      <v-row>
        <v-col>
          <v-text-field color="teal" label="username" v-model="username"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn width="320" v-if="username" class="teal lighten-2" x-large  @click="newGame">New Game</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn width="320" v-if="username" class="teal" x-large  @click="joinGame">Join Game</v-btn>
        </v-col>
      </v-row>
    </div>

    <!--    New Game -->
    <div v-if="this.step === 'new-game'">
      <v-alert v-if="showCopyAlert" dense outlined color="teal">
        <strong>Game ID</strong> copied to clipboard!
      </v-alert>

      <v-row>
        <v-col>
          <h2>Your Game ID: <span style="cursor: pointer" @click="copyText" class="teal--text">{{ gameId }}</span></h2>
          <p>Please share this Game ID with someone to play together.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-btn width="320" class="teal" x-large @click="startMultiplayerGame">Start Game</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-icon color="teal" style="cursor: pointer" @click="goBack">mdi-keyboard-backspace</v-icon>
        </v-col>
      </v-row>
    </div>

    <!--    Join Game-->
    <div v-if="this.step === 'join-game'">
      <v-row>
        <v-col>
          <v-text-field color="teal" label="game id" v-model="gameId"></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="gameId">
        <v-col>
          <v-btn width="320" class="teal" x-large @click="startMultiplayerGame">Start Game</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-icon color="teal" style="cursor: pointer" @click="goBack">mdi-keyboard-backspace</v-icon>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
export default {
name: "Multiplayer",
  data: () => ({
    username: null,
    gameId: null,
    step: "start",
    showCopyAlert: false
  }),
  methods: {
    copyText() {
      this.showCopyAlert = true;
      setTimeout(() => this.showCopyAlert = false, 1000);
      navigator.clipboard.writeText(this.gameId);
    },

    goBack() {
      this.step = "start";
      this.gameId = null;
      this.username = null;
    },
    newGame() {
      this.gameId = Math.random().toString(36).substring(2,8);
      this.step = "new-game"
      //this.$socket.client.emit('create_game',this.username)
    },

    joinGame() {
      this.step = "join-game"

    },

    startMultiplayerGame () {
      //this.$socket.client.emit('join_game',this.gameId,this.username)
    },

    startGame() {
      this.$socket.client.emit('start_game',this.gameId,this.username)
      this.playerIsReady = true
    }

  },
}
</script>

<style scoped>
#game {
  margin: auto;
  padding: 0;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
  position: relative;
}
.v-text-field {
  width: 320px;
}

</style>
