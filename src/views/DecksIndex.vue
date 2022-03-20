<script>
import axios from "axios";
export default {
  data: function () {
    return {
      decks: [],
      nameFilter: "",
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
  computed: {
    filteredDecks: function () {
      return this.decks.filter((deck) => {
        return deck.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      });
    },
  },
};
</script>

<template>
  <h1>Newest Decks</h1>
  <p>
    Deck Name Search:
    <input type="text" v-model="nameFilter" list="deckNames" />
  </p>
  <datalist id="deckNames">
    <option v-for="deck in decks" v-bind:key="deck.id">
      {{ deck.name }}
    </option>
  </datalist>
  <div v-for="deck in filteredDecks" v-bind:key="deck.id">
    <router-link v-bind:to="`/decks/${deck.id}`">
      <h2>{{ deck.name }}</h2>
    </router-link>
    <p>{{ deck.user.username }}</p>
    <!-- <p>{{ deck.first_card }}</p> -->
    <img v-bind:src="`${deck.first_card['image']}`" class="card-img-top" alt="" />
  </div>

  <!-- <div class="decks-index">
    <h1>Newest Decks</h1>
    <div v-for="deck in decks" v-bind:key="deck.id">
      <router-link v-bind:to="`/decks/${deck.id}`">
        <h2>{{ deck.name }}</h2>
      </router-link>
      <p>{{ deck.user_id }}</p>
    </div>
  </div> -->

  <!-- <div class="row row-cols-2 row-cols-md-4 g-4">
    <div class="col" v-for="deck in decks" v-bind:key="deck.id">
      <div class="card">
        <router-link v-bind:to="`/decks/${deck.id}`">
          <img v-bind:src="deck.image" class="card-img-top" alt="I'm too lazy to add images in the backend" />
        </router-link>
        <div class="card-body">
          <h5 class="card-title">{{ deck.name }}</h5>
          <p class="card-text">
            {{ deck.user }}
          </p>
        </div>
      </div>
    </div>
  </div> -->
</template>
