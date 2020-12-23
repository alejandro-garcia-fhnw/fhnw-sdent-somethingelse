<template>
  <div>
    <v-row>
      <v-col align="center">
        <v-card width="800px" height="220"
            v-if="this.current">
          <v-card-title>
            <v-spacer></v-spacer>
            <span v-html="current.question"/>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-row class="mt-0">
              <v-col lg12>
                <v-btn
                    v-for="(answer, index) in current.all_answers"
                    :key="index"
                    class="answer ml-1 mb-1"
                    :class="revealAnswer(index)"
                    width="380"
                    style="font-size: 1.5rem"
                    x-large>
                  {{ emotes[index] }}
                  <span v-html="answer"/>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions style="position: absolute; left: 50%; transform: translateX(-50%); bottom: 0;">
          </v-card-actions>
        </v-card>
        <div>
          <v-btn @click="nextQuestion">Skip</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
const opentdbUrl = 'https://opentdb.com/api.php?amount=30&category=9&difficulty=easy&type=multiple';

export default {
  name: 'Quiz',
  props: {
    emoteMap: Map
  },
  data: () => ({
    quizData: [],
    current: null,
    score: 0
  }),
  computed: {
    expressions() {
      return Array.from(this.emoteMap.keys());
    },
    emotes() {
      return Array.from(this.emoteMap.values());
    }
  },
  methods: {
    init() {
      // load questions from Open Trivia Database
      return axios.get(opentdbUrl).then(response => {
        this.quizData = response.data.results;
        console.log('Questions loaded');
      });
    },
    isStarted() {
      return this.current;
    },
    start() {
      this.nextQuestion();
    },
    nextQuestion() {
      const randomIndex = Math.floor(Math.random() * this.quizData.length);
      // TODO blacklist picked question
      this.current = this.quizData[randomIndex];
      this.current.all_answers = Object.freeze(this.shuffle([
        ...this.current.incorrect_answers,
        this.current.correct_answer
      ]));
      // find correct answer index again after shuffle of all possible answers
      this.current.correct_answer_index = this.current.all_answers
          .map((answer, index) => (answer === this.current.correct_answer) ? index : -1)
          .find(index => index >= 0);
      console.log('nextQuestion:', this.current.correct_answer_index);
    },
    answer(response) {
      let points = 0;
      if (this.current && !this.current.given_answer) {
        console.log('given answer:', response);
        this.$set(this.current, 'given_answer', response);
        if (response === this.expressions[this.current.correct_answer_index]) {
          points = 1;
        } else {
          console.log("wrong answer")
          // TODO this.$emit('capture-photo')
        }
      }
      return points;
    },
    revealAnswer(index) {
      if (this.current.given_answer) {
        if (this.current.correct_answer_index == index) {
          return 'green';
        } else if (this.current.given_answer === this.expressions[index]) {
          return 'red';
        }
      }
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }
};
</script>

<style scoped>
button {
  font-size: 20px;
}
</style>
