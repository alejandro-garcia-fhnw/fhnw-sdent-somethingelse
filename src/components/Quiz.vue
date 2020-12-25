<template>
  <div>
    <v-row>
      <v-col align="center">
        <v-card width="800px" height="220"
            v-if="currentTrivia">
          <v-card-title>
            <v-spacer></v-spacer>

            <span v-html="currentTrivia.question"/>

<!--        Funktioniert immernonig :-) has jetzt uf mehreri Arte Probiert, es lauft nur bim erste mol.

            <vue-typed-js :stringsElement="'#test'" :showCursor="false" :contentType="'html'">
               <p class="typing"></p>
             </vue-typed-js>
             <div id="test" style="display: none">
               <p>{{ currentTrivia.question }}</p>
             </div>
 -->

            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-row class="mt-0">
              <v-col lg12>
                <v-btn
                    v-for="(answer, index) in currentTrivia.all_answers"
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

import opentdb from 'opentdb-api';

export default {
  name: 'Quiz',
  props: {
    emoteMap: Map
  },
  data: () => ({
    triviaOptions: Object.freeze({
      amount: 1,
      category: 'general', //'any'
      difficulty: 'easy',
      type: 'multiple'
    }),
    triviaLoader: null,
    currentTrivia: null,
    triviaCount: 0,
    maxTrivia: 10
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
      return opentdb.getToken()
        .then(token => this.triviaOptions = Object.freeze(
            Object.assign({token: token}, this.triviaOptions)))
        .then(() => this.triviaLoader = this.getTriviaLoader());
    },
    reset() {
      return opentdb.resetToken(this.triviaOptions.token);
    },
    getTriviaLoader() {
      return opentdb.getTrivia(this.triviaOptions).then(results => {
        console.debug('question loaded', results[0]);
        return results[0];
      });
    },
    isStarted() {
      return this.currentTrivia;
    },
    start() {
      this.nextQuestion();
    },
    nextQuestion() {
      if (this.triviaCount < this.maxTrivia) {
        this.triviaLoader.then(trivia => {
          this.currentTrivia = buildTrivia(trivia);
          this.triviaCount++;
          console.log('nextQuestion:', trivia.correct_answer_index);
        }).then(() => {
          this.triviaLoader = this.getTriviaLoader(); // preload the next question
        });
        return true;
      } else {
        this.currentTrivia = null;
        // TODO emit end?
      }
    },
    buildTrivia(trivia) {
      trivia.all_answers = Object.freeze(this.shuffle([
        ...trivia.incorrect_answers,
        trivia.correct_answer
      ]));
      // find correct answer index again after shuffle of all possible answers
      trivia.correct_answer_index = trivia.all_answers
          .map((answer, index) => (answer === trivia.correct_answer) ? index : -1)
          .find(index => index >= 0);
    },
    answer(response) {
      let points = 0;
      if (this.currentTrivia && !this.currentTrivia.given_answer) {
        console.log('given answer:', response);
        this.$set(this.currentTrivia, 'given_answer', response);
        if (response === this.expressions[this.currentTrivia.correct_answer_index]) {
          points = 1;
        } else {
          console.log("wrong answer")
          // TODO this.$emit('capture-photo')
        }
      }
      return points;
    },
    revealAnswer(index) {
      if (this.currentTrivia.given_answer) {
        if (this.currentTrivia.correct_answer_index == index) {
          return 'green';
        } else if (this.currentTrivia.given_answer === this.expressions[index]) {
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
