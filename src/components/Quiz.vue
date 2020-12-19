<template>
  <div class="quiz">
    <div ref="question" class="hidden">?</div>
    <button @click="nextQuestion">Next</button>
  </div>
</template>

<script>
export default {
  name: "Quiz",
  data: () => ({
    quiz : {
      pos : -1, // < 0 means quiz not started
      questions : Object.freeze([
        ['How was the year 2020?', 'sad'],
        ['', '']
      ])
    }
  }),
  methods: {
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
  }
};
</script>

<style scoped>
button {
  font-size: 20px;
}
</style>
