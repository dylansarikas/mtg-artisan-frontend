<script>
import axios from "axios";
export default {
  data: function () {
    return {
      cards: [],
    };
  },
  created: function () {
    this.indexCards();
  },
  methods: {
    indexCards: function () {
      axios.get("/cards").then((response) => {
        console.log("cards index", response);
        this.cards = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="cards-index">
    <h1>Card Search</h1>
    <div>
      <h2>{{ cards }}</h2>
    </div>
  </div>
</template>
