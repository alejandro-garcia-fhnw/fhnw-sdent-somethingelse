<template>
  <div id="sitecontent">
    <div class="input">
      <video ref="video" width="480" height="320" autoplay muted />
      <h1 ref="expression">
        😶
      </h1>
      <progress ref="progress" value="0" min="0" max="100" />
    </div>
    <div class="quiz">
      <button ref="startQuiz" @click="startQuiz">Start</button>
      <div ref="question" class="hidden">?</div>
    </div>
  </div>
</template>

<script>
import * as faceapi from '@/plugins/face-api.js';

export default {
  name: "Game",
  data: () => ({
    detect : Object.freeze({
      interval : 100,
      options : new faceapi.TinyFaceDetectorOptions()
    }),
    emotes : Object.freeze({
      'angry' : '😡',
      'sad' : '😢',
      'surprised' : '😲',
      'happy' : '😃',
      'neutral' : '😶'
    }),
    expressions : Object.freeze({}),
    expressionCount : {},
    quiz : {
      pos : -1, // < 0 means quiz not started
      questions : Object.freeze([
        ['How was the year 2020?', 'sad']
      ])
    }
  }),
  mounted() {
    const video = this.$refs.video;
    video.addEventListener('play', () => {
      this.startDetection(video);
    });
    this.play(video);
  },
  methods: {
    startDetection(video) {
      setInterval(async () => {
        const detection = await faceapi
            .detectSingleFace(video, this.detect.options)
            .withFaceExpressions();
        if (detection && detection.expressions) {
          this.expressions = Object.freeze(detection.expressions);
        }
      }, this.detect.interval);
    },
    play(video) {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then(() => {
        navigator.getUserMedia(
          { video: {} },
          stream => video.srcObject = stream,
          err => console.error(err)
        );
      });
    },
    startQuiz() {
      this.$refs.startQuiz.classList.add('hidden');
      this.nextQuestion();
      this.$refs.question.classList.remove('hidden');
      console.log('quiz started');
    },
    nextQuestion() {
      this.quiz.pos++;
      this.$refs.question.innerHTML = this.quiz.questions[this.quiz.pos][0];
    }
  },
  watch: {
    expressions: function() {
      const expressionElem = this.$refs.expression;
      let emote = this.emotes['neutral'];
      for (const [name, score] of Object.entries(this.expressions)) {
        const isNeutral = (name === 'neutral');
        if (score > 0.7) {
          const count = (this.expressionCount[name] || 0);
          if (count === 0) {
            this.expressionCount = {};
            expressionElem.classList = '';
          }
          emote = this.emotes[name] || emote;
          this.expressionCount[name] = count + 1;
          this.$refs.progress.value = !isNeutral ? (count * 10) : 0;
          if (!isNeutral && this.expressionCount[name] > 10) {
            // locked in
            if (this.quiz.pos < 0 || (name === this.quiz.questions[this.quiz.pos][1])) {
              expressionElem.classList.add('green');
            } else {
              expressionElem.classList.add('red');
            }
          }
          break;
        }
      }
      expressionElem.innerHTML = emote;
      console.log(this.expressionCount);
    }
  },
};
</script>

<style scoped>
#sitecontent {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
canvas {
  position: absolute;
}
#expression {
  font-size: 200px;
}
.input {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  font-size: 20px;
}
.hidden {
  display: none;
}
.green {
  background-color: lightgreen;
}
.red {
  background-color: orangered;
}
</style>
