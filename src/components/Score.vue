<template>
  <v-card>
    <v-card-text>
      <h1 class="mt-2 mb-2">
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
