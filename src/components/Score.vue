<template>
  <v-card>
    <v-card-text>
      <h1 class="mt-5 mb-5">
        {{ score }}
      </h1>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Score',
  props: {
    score: Number
  }
}
</script>

<style scoped>
.v-card {
  padding: 10px;
  font-family: Arial;
}
h1 {
  font-size: 7rem;
}
</style>
