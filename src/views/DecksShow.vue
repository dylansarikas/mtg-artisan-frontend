<script>
import axios from "axios";
export default {
  data: function () {
    return {
      deck: {},
      errors: [],
      newCardDeckParams: {},
      cards: [],
      cardSearch: "",
      cardImage: "",
    };
  },
  created: function () {
    axios.get("/decks/" + this.$route.params.id).then((response) => {
      console.log("decks show", response);
      this.deck = response.data;
    });
  },
  methods: {
    createCardDeck: function () {
      this.newCardDeckParams["deck_id"] = this.$route.params.id;
      this.newCardDeckParams["multiverse_id"] = this.cards["multiverse_ids"][0];
      this.newCardDeckParams["amount"] = 4;
      // console.log(this.newCardDeckParams);
      axios
        .post("/card_decks", this.newCardDeckParams)
        .then((response) => {
          console.log("cardDeck create", response.data);
        })
        .catch((error) => {
          console.log("cardDeck create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    indexCards: function () {
      axios
        .get(`/cards?search=${this.cardSearch}`)
        .then((response) => {
          console.log("cards index", response);
          this.cards = response.data;
          this.cardSearch = "";
          this.cardImage = response.data["image_uris"]["small"];
        })
        .catch((error) => {
          console.log("card index error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="decks-show">
    <h2>{{ deck.name }}</h2>
    <div v-for="card_deck in deck.card_decks" v-bind:key="card_deck.id">
      <!-- <p>{{ card_deck }}</p> -->
      <p>{{ `${card_deck["card"]["name"]}: ${card_deck["amount"]}` }}</p>
    </div>
    <!-- <p>{{ deck.card_decks }}</p> -->
    <!-- <img v-bind:src="deck.url" v-bind:alt="deck.name" /> -->
    <!-- <router-link to="/decks">Back to all decks</router-link> -->
  </div>
  <div v-if="deck.owner" class="card-show">
    <p>Add Cards</p>
    <form v-on:submit.prevent="createCardDeck()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="cards-index">
        <h1>Fuzzy Search for a Card</h1>
        <form v-on:submit.prevent="indexCards()">
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
          Card Name:
          <input type="text" v-model="cardSearch" />
          <input type="submit" value="Search" />
        </form>
        <div v-if="!!cards['name']">
          <!-- <p>{{ cards["name"] }}</p>
          <p>{{ cards["image_uris"]["small"] }}</p> -->
          <img v-bind:src="cardImage" class="card-img-top" alt="" />
          <!-- <p>{{ cards }}</p> -->
        </div>
      </div>
    </form>
  </div>
  <div class="cardDecks-new">
    <form v-on:submit.prevent="createCardDeck()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div v-if="!!cards['name']">
        Click Here to Add Card
        <input type="submit" value="Add" />
      </div>
    </form>
  </div>
</template>
