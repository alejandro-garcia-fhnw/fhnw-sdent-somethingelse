<template>
  <div>

<!--    <div class="quiz">
      <div ref="question" class="hidden">?</div>
      <button @click="nextQuestion">Next</button>
    </div>-->

    <v-row>
      <v-col align="center">
        <v-card width="800px" height="200" v-if="actualQuestion">
          <v-card-title>{{actualQuestion.question}}</v-card-title>
          <v-card-actions style="position: absolute; left: 50%; transform: translateX(-50%); bottom: 0;">
            <v-spacer></v-spacer>
            <v-btn style="font-size: 1.5rem" x-large color="primary"  v-for="a in actualQuestion.allAnswers" :key="a"> {{ a }}</v-btn>
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
const url = 'https://opentdb.com/api.php?amount=30&category=9&difficulty=easy&type=multiple';

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
    smiles : ["😢","😲","😡","😃"],
    randomSmile: null,
    actualQuestion: null
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
      let randomSmile = this.smiles[Math.floor(Math.random() * this.smiles.length)]
      let otherSmiles = this.smiles.filter(function(item) {
        return item !== randomSmile
      })

      let randomQuestion = this.questions[Math.floor(Math.random() * this.questions.length)]
      if (!randomQuestion.allAnswers) { //prüft ob das Object schon ein allAnswers Array hat
        let allAnswers = randomQuestion.incorrect_answers
        for (let i = 0; i < allAnswers.length; i++) {
          allAnswers[i] = otherSmiles[i] + allAnswers[i]
        }
        randomQuestion.correct_answer = randomSmile + randomQuestion.correct_answer
        allAnswers.push(randomQuestion.correct_answer)
        this.shuffle(allAnswers)

        randomQuestion.allAnswers = allAnswers

        this.actualQuestion = randomQuestion;
        console.log("correct answer: " + this.actualQuestion.correct_answer)
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
      if (response === "happy") {
        response = "😃"
      }
      if (response === "sad") {
        response = "😢"
      }
      if (response === "surprised") {
        response = "😲"
      }
      //return response === this.quiz.questions[this.quiz.pos][1];
      //return response === this.actualQuestion.allAnswers[0]
      if (this.actualQuestion.correct_answer.includes(response)) {
        return true
      }
    }
  },
  mounted() {
    // Get questions from Open Trivia Database
    axios.get(url).then(response => {
      this.questions = response.data.results
      console.log('Questions loaded')
      this.getNewQuestion()

    })
    .catch(e => {
      console.log(e)
    })
    //this.getNewQuestion();
  }
};
</script>

<style scoped>
button {
  font-size: 20px;
}
</style>
