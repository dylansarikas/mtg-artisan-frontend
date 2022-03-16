<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
      decks: [],
    };
  },
  created: function () {
    console.log("here");
    axios.get("/users/" + this.$route.params.id).then((response) => {
      console.log("users show", response);
      this.user = response.data;
    });
    // axios.get("/decks").then((response) => {
    //   console.log("decks index", response);
    //   this.decks = response.data;
    // });
  },
  methods: {},
};
</script>

<template>
  <div class="users-show">
    <h1>{{ user.username }}</h1>
    <!-- <img v-bind:src="user.url" v-bind:alt="user.name" /> -->
  </div>
  <div class="user-decks">
    <h2>Users Decks</h2>
    <div v-for="deck in user.decks" v-bind:key="deck.id">
      <router-link v-bind:to="`/decks/${deck.id}`">
        <h3>{{ deck.name }}</h3>
      </router-link>
    </div>
  </div>
</template>
