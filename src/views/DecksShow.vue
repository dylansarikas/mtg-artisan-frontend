<script>
import axios from "axios";
export default {
  data: function () {
    return {
      deck: {},
    };
  },
  created: function () {
    axios.get("/decks/" + this.$route.params.id).then((response) => {
      console.log("decks show", response);
      this.deck = response.data;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="decks-show">
    <h2>{{ deck.name }}</h2>
    <div v-for="card_deck in deck.card_decks" v-bind:key="card_deck.id">
      <p>{{ card_deck }}</p>
      <p>{{ `${card_deck["card"]["name"]}: ${card_deck["amount"]}` }}</p>
    </div>
    <!-- <p>{{ deck.card_decks }}</p> -->
    <!-- <img v-bind:src="deck.url" v-bind:alt="deck.name" /> -->
    <router-link to="/decks">Back to all decks</router-link>
  </div>
</template>
