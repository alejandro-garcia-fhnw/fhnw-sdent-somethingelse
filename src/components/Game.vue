<template>
  <div id="game" ref="game">
    <Score class="mb-16" :score="this.score"></Score>
  <div>
    <video @click="capturePhoto" ref="video" width="480" height="320" autoplay muted/>
  </div>

    <canvas ref="canvas" id="canvas" width="320" height="240" hidden></canvas>
    <ul>
      <li v-for="c in captures">
        <img v-bind:src="c" height="50" />
      </li>
    </ul>


    <Detect ref="detect" @detected="onDetect"/>
    <Quiz ref="quiz" @score="updateScore"/>
  </div>
</template>

<script>
import Detect from "./Detect.vue";
import Quiz from "./Quiz.vue";
import Score from "./Score"

export default {
  name: "Game",
  components: {
    Score,
    Detect,
    Quiz
  },
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
      score: 0
    }
  },
  mounted() {
    this.video = this.$refs.video;


    const video = this.$refs.video;
    const detect = this.$refs.detect;
    video.addEventListener('play', () => { detect.startDetection(video); });
    detect.init().then(() => { this.startRecording(video); });
  },
  methods: {
    updateScore(score) {
      this.score += score
    },
    capturePhoto() {
      this.canvas = this.$refs.canvas;
      let context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 320, 240);
      this.captures.push(canvas.toDataURL("image/png"));
      console.log("photo taken!")
    },

    startRecording(video) {
      navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
      );
    },
    onDetect(expression) {
      const quiz = this.$refs.quiz;
      if (!expression) {
        this.$refs.game.classList = '';
      } else if /*(!quiz.isStarted() ||*/ (quiz.answer(expression)) {
        this.$refs.game.classList.add('green');
      } else {
        this.$refs.game.classList.add('red');
      }
    }
  }
};
</script>

<style scoped>
#game {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
}
video {
  width: 250px;
  height: 250px;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  margin: 20px;
  object-fit: cover;
  object-position: center right;
}
</style>
