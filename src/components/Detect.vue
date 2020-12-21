<template>
  <div class="detect">

    <v-progress-circular class="amber--text" size="190" :value="this.progress" width="12" id="progressbar">
      <div id="expression" ref="expression">
        {{ emotes.default }}
      </div>
    </v-progress-circular>
    <progress ref="progress" value="0" min="0" max="10" hidden/>
  </div>
</template>

<script>
import * as faceapi from '@/plugins/face-api.js';

export default {
  name: "Detect",
  data: () => ({
    detect : Object.freeze({
      options : new faceapi.TinyFaceDetectorOptions(),
      interval : 100,
      minScore : 0.7,
      lockCount : 10
    }),
    emotes : Object.freeze({
      'angry' : '😡',
      'sad' : '😢',
      'surprised' : '😲',
      'happy' : '😃',
      'neutral' : '😶',
      'default' : '😶'
    }),
    expressionScores : Object.freeze({}),
    counter : {},
    progress: 0
  }),
  methods: {
    init() {
      return Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
    },
    startDetection(input) {
      setInterval(async () => {
        const detection = await faceapi
            .detectSingleFace(input, this.detect.options)
            .withFaceExpressions();
        if (detection && detection.expressions) {
          this.expressionScores = Object.freeze(detection.expressions);
        } else {
          console.log('unable to detect any expressions');
          this.expressionScores = Object.freeze({});
        }
      }, this.detect.interval);
    }
  },
  watch: {
    expressionScores: function() {
      const expression = Object.keys(this.expressionScores)
          .filter(key => this.expressionScores[key] >= this.detect.minScore)
          .find(key => key !== 'neutral') || '';
      let count = this.counter[expression] || 0;
      this.counter = Object.freeze({ [expression] : ++count });
      this.$refs.progress.value = expression ? count : 0;
      this.progress = 10 * (expression ? count : 0)
      this.$refs.expression.innerHTML = this.emotes[expression] || this.emotes.default;
      if (!expression || count > this.detect.lockCount) {
        this.$emit("detected", expression);
      }
      console.debug(this.counter[expression], expression);
    }
  }
};
</script>

<style scoped>
.detect {
  display: flex;
  justify-content: center;
  align-items: center;
}
#expression {
  font-size: 200px;
}
#progressbar {

}
</style>
