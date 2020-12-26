<template>
  <v-card class="mx-auto" width="600">
    <v-toolbar color="accent-4">
      <v-icon color="red">mdi-star</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Leaderboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon color="red">mdi-star</v-icon>
    </v-toolbar>  
    <v-list>  
      <v-list-item
          v-for="entry in loaderboard"
          :key="entry.title">
        <v-list-item-avatar>
          <v-img
            :alt="`${entry.title} photo`"
            :src="entry.photo"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="entry.title"/>
        </v-list-item-content>
        <v-list-item-icon>
        </v-list-item-icon>
        <v-list-item-action>
          <v-list-item-action-text v-text="entry.score"/>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>

export default {
  name: 'Loaderboard',
  data: () => ({
    loaderboard: [
      {
        photo: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Jason Oner',
        score: 12345
      },
      {
        photo: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Mike Carlson',
        score: 1234
      },
      {
        photo: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker',
        score: 123
      },
      {
        photo: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Ali Connors',
        score: 12
      },
    ]
  }),
  methods: {
  }
};
</script>

<style scoped>
</style>
