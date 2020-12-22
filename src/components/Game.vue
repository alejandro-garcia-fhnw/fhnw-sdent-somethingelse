<template>
  <div id="game" ref="game">
    <h1 @click="reloadPage" style="font-size: 3rem; cursor: pointer">something<span class="red--text">else</span></h1>
    <Score class="mb-16 mt-3" :score="this.score"></Score>
  <div>
    <video @click="capturePhoto" ref="video" width="480" height="320" autoplay muted playsinline/>
  </div>

    <canvas ref="canvas" id="canvas" width="320" height="240" hidden></canvas>

    <Detect class="mb-5" ref="detect" @detected="onDetect"/>
    <Quiz ref="quiz" @score="updateScore" @capture-photo="capturePhoto"/>
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
    this.video = this.$refs.video; //needed for video capture


    const video = this.$refs.video;
    const detect = this.$refs.detect;
    video.addEventListener('play', () => { detect.startDetection(video); });
    detect.init().then(() => { this.startRecording(video); });
  },
  methods: {
    reloadPage(){
      window.location.reload()
    },
    updateScore(score) {
      this.score += score
    },
    capturePhoto() {
      this.canvas = this.$refs.canvas;
      let context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 320, 240);
      this.captures.push(canvas.toDataURL("image/png"));
      console.log("photo taken!")
      this.$emit('photos', this.captures)
    },

    startRecording(video) {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
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
