<script>
import axios from "axios";
export default {
  data: function () {
    return {
      deck: {},
      errors: [],
      cards: [],
      newCardDeckParams: {},
      deckCards: [],
      // cardSearch: "",
      // cardImage: "",
      newCardParams: {},
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
        .get("/cards", {
          params: {
            name: this.newCardParams["cardName"],
            color: this.newCardParams["cardColor"],
            text: this.newCardParams["cardText"],
            type: this.newCardParams["cardType"],
          },
        })
        .then((response) => {
          console.log("cards index", response);
          // console.log(response.data.data[0]["image_uris"]["small"]);
          this.cards = response.data.data;
          // console.log(this.cards);
          // this.cardSearch = "";
          // this.cardImage = response.data["image_uris"]["small"];
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
    <form v-on:submit.prevent="indexCards()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label for="cardName">Card Name:</label>
        <input type="text" id="cardName" v-model="newCardParams.cardName" />
      </div>
      <div>
        <label for="cardColor">Card Color:</label>
        <input type="text" id="cardColor" v-model="newCardParams.cardColor" />
      </div>
      <div>
        <label for="cardText">Card Text:</label>
        <input type="text" id="cardText" v-model="newCardParams.cardText" />
      </div>
      <div>
        <label for="cardType">Card Type:</label>
        <input type="text" id="cardType" v-model="newCardParams.cardType" />
      </div>
      <input type="submit" value="Submit" />
    </form>
    <div v-if="!!cards[0]">
      <div v-if="!!cards[0]['name']">
        <div v-for="card in cards" v-bind:key="card.id">
          <p>{{ card["name"] }}</p>
          <img v-bind:src="`${card['image_uris']['small']}`" class="card-img-top" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="cardDecks-new">
    <form v-on:submit.prevent="createCardDeck()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div v-if="!!cards[0]">
        <div v-if="!!cards[0]['name']">
          Click Here to Add Card
          <input type="submit" value="Add" />
        </div>
      </div>
    </form>
  </div>
</template>
