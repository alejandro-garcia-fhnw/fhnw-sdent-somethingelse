<template>
  <div id="game" ref="game">
<div class="wrapper">
  <video ref="video" width="480" height="320" autoplay muted/>
</div>


    <Detect ref="detect" @detected="onDetect"/>
    <Quiz ref="quiz" />
  </div>
</template>

<script>
import Detect from "./Detect.vue";
import Quiz from "./Quiz.vue";

export default {
  name: "Game",
  components: {
    Detect,
    Quiz
  },
  mounted() {
    const video = this.$refs.video;
    const detect = this.$refs.detect;
    video.addEventListener('play', () => { detect.startDetection(video); });
    detect.init().then(() => { this.startRecording(video); });
  },
  methods: {
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
  justify-content: center;
  align-items: center;
}
.wrapper {
  padding: 100px;
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
