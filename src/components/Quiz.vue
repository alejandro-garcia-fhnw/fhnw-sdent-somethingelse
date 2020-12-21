<template>
  <div>

<!--    <div class="quiz">
      <div ref="question" class="hidden">?</div>
      <button @click="nextQuestion">Next</button>
    </div>-->

    <v-row>
      <v-col align="center">
        <v-card width="100%" height="200" v-if="actualQuestion">
          <v-card-title>{{actualQuestion.question}}</v-card-title>
          <v-card-actions style="position: absolute; left: 50%; transform: translateX(-50%); bottom: 0;">
            <v-spacer></v-spacer>
            <v-btn color="primary" large v-for="a in actualQuestion.allAnswers" :key="a"><span style="font-size: 2.5rem" class="mr-3"></span> {{ a }}</v-btn>
<!--            <v-btn color="primary" large> <span style="font-size: 2.5rem" class="mr-3">{{ emotes[Math.floor(Math.random() * emotes.length)] }}</span> {{ actualQuestion.correct_answer}}</v-btn>-->
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn @click="getNewQuestion()">Next</v-btn>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import axios from 'axios'
const url = 'https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple';

export default {
  name: "Quiz",
  data: () => ({
    quiz : {
      pos : -1, // < 0 means quiz not started
      questions : Object.freeze([
        ['How was the year 2020?', 'sad'],
        ['How are you?', 'happy']
      ])
    },
    questions : [],
    emotes : ["😢","😲","😡"],
    actualQuestion: {}
  }),
  methods: {

    /*
    * Shuffelt den Array, wird für allAnswers gebraucht
    */
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },

    /*
    * wählt zufälles Fragen-Objekt aus
    * packt die falschen und die richtigen antworten in ein Array von allAnswers und mischelt den Array
    */
    getNewQuestion() {
      let randomQuestion = this.questions[Math.floor(Math.random() * this.questions.length)]
      if (!randomQuestion.allAnswers) { //prüft ob das Object schon ein allAnswers Array hat
        let allAnswers = randomQuestion.incorrect_answers
        allAnswers.push(randomQuestion.correct_answer)
        this.shuffle(allAnswers)
        randomQuestion.allAnswers = allAnswers
        this.actualQuestion = randomQuestion;
        console.log(this.actualQuestion.correct_answer)
      }

    },
    nextQuestion() {
      if (this.quiz.pos < this.quiz.questions.length - 1) {
        this.quiz.pos++;
      }
      this.$refs.question.innerHTML = this.quiz.questions[this.quiz.pos][0];
      this.$refs.question.classList.remove('hidden');
      console.log('quiz: next question', this.quiz.pos);
    },
    isStarted() {
      return this.quiz.pos >= 0;
    },
    answer(response) {
      return response === this.quiz.questions[this.quiz.pos][1];
    }
  },
  mounted() {
    // Get questions from Open Trivia Database
    axios.get(url).then(response => {
      this.questions = response.data.results
      console.log('Questions loaded')
    })
    .catch(e => {
      console.log(e)
    })
    this.getNewQuestion();
  }
};
</script>

<style scoped>
button {
  font-size: 20px;
}
</style>
