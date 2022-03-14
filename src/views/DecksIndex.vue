<script>
import axios from "axios";
export default {
  data: function () {
    return {
      decks: [],
    };
  },
  created: function () {
    this.indexDecks();
  },
  methods: {
    indexDecks: function () {
      axios.get("/decks").then((response) => {
        console.log("decks index", response);
        this.decks = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="decks-index">
    <h1>All decks</h1>
    <div v-for="deck in decks" v-bind:key="deck.id">
      <h2>{{ deck.name }}</h2>
      <!-- <img v-bind:src="deck.url" v-bind:alt="deck.name" /> -->
      <!-- <p>Width: {{ deck.width }}</p>
      <p>Height: {{ deck.height }}</p> -->
    </div>
  </div>
</template>
