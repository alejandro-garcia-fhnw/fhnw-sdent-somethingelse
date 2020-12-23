<template>
  <div id="game" ref="game">
    <h1 @click="reloadPage" style="font-size: 3rem; cursor: pointer">something<span class="red--text">else</span></h1>
    <Score class="mb-16 mt-3" :score="score"></Score>
    <div class="videoWrapper">
      <video ref="video"
          @click="capturePhoto" width="250" height="250"
          autoplay muted playsinline/>
    </div>
    <Detect ref="detect"
        class="mb-5"
        :emoteMap="emoteMap"
        @detected="onDetect"/>
    <Quiz ref="quiz"
        :emoteMap="emoteMap"
        @capture-photo="capturePhoto"/>
  </div>
</template>

<script>
import Detect from "./Detect.vue";
import Quiz from "./Quiz.vue";
import Score from "./Score"

export default {
  name: 'Game',
  components: {
    Score,
    Detect,
    Quiz
  },
  data: () => ({
    emoteMap: Object.freeze(new Map([
      ['happy', '😃'],
      ['surprised', '😲'],
      ['angry', '😡'],
      ['sad', '😢'],
      ['neutral', '😶']
    ])),
    score: 0,
    nextQuestionTimeout: 2000,
    captures: []
  }),
  mounted() {
    const video = this.$refs.video;
    const detect = this.$refs.detect;
    const quiz = this.$refs.quiz;
    video.addEventListener('play', () => { detect.start(); });
    Promise.all([ quiz.init(), detect.init(video) ])
        .then(() => { quiz.start(); })
        .then(() => { this.startRecording(video); })
        .catch(error => { console.warn('init failed', error); });
  },
  methods: {
    reloadPage(){
      window.location.reload()
    },
    capturePhoto() {
      const canvas = document.createElement("canvas");
      canvas.width = this.$refs.video.videoWidth;
      canvas.height = this.$refs.video.videoHeight;
      canvas.getContext("2d").drawImage(this.$refs.video, 0, 0);
      this.captures.push(canvas.toDataURL("image/png"));
      console.log("photo taken!");
      this.$emit('photos', this.captures);
    },
    startRecording(video) {
      navigator.getUserMedia = navigator.getUserMedia
          || navigator.webkitGetUserMedia
          || navigator.mozGetUserMedia;
      navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
      );
    },
    onDetect(expression) {
      if (expression && this.$refs.quiz.isStarted()) {
        this.score += this.$refs.quiz.answer(expression);
        this.$refs.detect.stop();
        setTimeout(() => {
          this.$refs.quiz.nextQuestion();
          this.$refs.detect.start();
        }, this.nextQuestionTimeout);
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
#game video {
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
