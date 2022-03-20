<script>
import axios from "axios";
export default {
  data: function () {
    return {
      cards: [],
      errors: [],
      cardSearch: "",
      cardImage: "",
      newCardSearch: {},
    };
  },
  created: function () {
    // this.indexCards();
  },
  methods: {
    indexCards: function () {
      axios
        // .get(`/cards?search=${this.cardSearch}`)
        // .get("/cards", this.newCardSearch)
        .get("/cards", {
          params: {
            name: this.newCardSearch["cardName"],
            color: this.newCardSearch["cardColor"],
            text: this.newCardSearch["cardText"],
            type: this.newCardSearch["cardType"],
          },
        })
        .then((response) => {
          console.log("cards index", response);
          // console.log(response.data.data[0]["image_uris"]["small"]);
          this.cards = response.data.data;
          console.log(this.cards[0]["name"]);
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
  <div class="cards-search-index">
    <h1>Search for a Card</h1>
    <form v-on:submit.prevent="indexCards()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label for="cardName">Card Name:</label>
        <input type="text" id="cardName" v-model="newCardSearch.cardName" />
      </div>
      <div>
        <label for="cardColor">Card Color:</label>
        <input type="radio" id="white" value="white" v-model="newCardSearch.cardColor" />
        <label for="white">White</label>
        <input type="radio" id="blue" value="blue" v-model="newCardSearch.cardColor" />
        <label for="blue">Blue</label>
        <input type="radio" id="black" value="black" v-model="newCardSearch.cardColor" />
        <label for="black">Black</label>
        <input type="radio" id="red" value="red" v-model="newCardSearch.cardColor" />
        <label for="red">Red</label>
        <input type="radio" id="green" value="green" v-model="newCardSearch.cardColor" />
        <label for="green">Green</label>
        <!-- <span>Picked: {{ picked }}</span> -->
      </div>
      <div>
        <label for="cardText">Card Text:</label>
        <input type="text" id="cardText" v-model="newCardSearch.cardText" />
      </div>
      <div>
        <label for="cardType">Card Type:</label>
        <input type="text" id="cardType" v-model="newCardSearch.cardType" />
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

  <!-- <div class="cards-index">
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
      <p>{{ cards["name"] }}</p>
      <p>{{ cards["image_uris"]["small"] }}</p>
      <img v-bind:src="cardImage" class="card-img-top" alt="" />
      <p>{{ cards }}</p>
    </div>
  </div> -->
</template>
