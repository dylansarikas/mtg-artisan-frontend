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
      amount: 1,
      multiverse: 1,
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
      console.log(this.cards[0]);
      this.newCardDeckParams["deck_id"] = this.$route.params.id;
      // this.newCardDeckParams["multiverse_id"] = this.cards["multiverse_ids"][0];
      this.newCardDeckParams["multiverse_id"] = this.multiverse;
      this.newCardDeckParams["amount"] = this.amount;
      // console.log(this.newCardDeckParams);
      axios
        .post("/card_decks", this.newCardDeckParams)
        .then((response) => {
          console.log("cardDeck create", response.data);
          // this deck push blah
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
        <input type="radio" id="white" value="white" v-model="newCardParams.cardColor" />
        <label for="white">White</label>
        <input type="radio" id="blue" value="blue" v-model="newCardParams.cardColor" />
        <label for="blue">Blue</label>
        <input type="radio" id="black" value="black" v-model="newCardParams.cardColor" />
        <label for="black">Black</label>
        <input type="radio" id="red" value="red" v-model="newCardParams.cardColor" />
        <label for="red">Red</label>
        <input type="radio" id="green" value="green" v-model="newCardParams.cardColor" />
        <label for="green">Green</label>
        <!-- <span>Picked: {{ picked }}</span> -->
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
      <div v-if="!!cards[0]['multiverse_ids'][0]">
        <div v-for="card in cards" v-bind:key="card.id">
          <div v-if="!!card['image_uris']">
            <p>{{ card["name"] }}</p>
            <img v-bind:src="`${card['image_uris']['small']}`" class="card-img-top" alt="" />
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
          </div>
          <div v-else-if="!!card['card_faces']">
            <p>{{ card["name"] }}</p>
            <img v-bind:src="`${card['card_faces'][0]['image_uris']['small']}`" class="card-img-top" alt="" />
            <img v-bind:src="`${card['card_faces'][1]['image_uris']['small']}`" class="card-img-top" alt="" />
            <div class="cardDecks-new">
              <form v-on:submit.prevent="createCardDeck()">
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
                <div v-if="!!cards[0]">
                  <div v-if="!!cards[0]['name']">
                    <label for="cardAmount">Add Copies</label>
                    <input type="text" id="cardAmount" v-model="amount" />
                    <input type="submit" value="Add" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="cardDecks-new">
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
    </div> -->
  </div>
</template>
