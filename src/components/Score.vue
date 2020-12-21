<template>
  <v-card style="padding: 10px">
    <v-card-text>
      <v-row>
        <v-col align="center">
          <h1 class="mt-2 mb-2" style="font-size: 7rem; font-family: Arial">{{ score }}</h1>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>

</template>

<script>
export default {
  props: ['score'],
}

</script>

<style scoped>

</style>
