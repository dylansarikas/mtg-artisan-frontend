<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to MTG Artisan",
      decks: [],
      recentDecks: [],
    };
  },
  created: function () {
    axios.get("/decks").then((response) => {
      console.log("decks index", response);
      this.decks = response.data;
      var recent = 5;
      while (recent > 0) {
        this.recentDecks.push(this.decks[this.decks.length - recent]);
        recent = recent - 1;
      }
    });
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <div class="decks-index">
    <h1>Five Recent Decks</h1>
    <div v-for="recentDeck in recentDecks" v-bind:key="recentDeck.id">
      <router-link v-bind:to="`/decks/${recentDeck.id}`">
        <h2>{{ recentDeck.name }}</h2>
      </router-link>
      <p>{{ recentDeck.user.username }}</p>
      <img v-bind:src="`${recentDeck.first_card['image']}`" class="card-img-top" alt="" />
    </div>
  </div>
</template>

<style></style>
