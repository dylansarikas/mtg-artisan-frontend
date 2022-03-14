<script>
import axios from "axios";
export default {
  data: function () {
    return {
      cards: [],
      cardSearch: "",
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
    <h1>Fuzzy Search for a Card</h1>
    <form v-on:submit.prevent="indexDeck()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Card Name:
      <input type="text" v-model="cardSearch" />
      <input type="submit" value="Search" />
    </form>
  </div>
  <!-- <div class="cards-index">
    <h1>Card Search</h1>
    <p>
      Search:
      <input type="text" id="search" v-model="cardSearch" />
    </p> -->
  <!-- <datalist id="cardNames">
      <option v-for="card in cards" v-bind:key="card.id">
        {{ card.name }}
      </option>
    </datalist> -->
  <!-- <div>
      <h2>{{ cards }}</h2>
    </div> -->
  <!-- <input type="submit" value="Submit" />
  </div> -->
</template>
