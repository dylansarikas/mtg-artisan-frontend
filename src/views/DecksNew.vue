<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newDeckParams: {},
      errors: [],
      sadStatus: "",
    };
  },
  created: function () {},
  methods: {
    createDeck: function () {
      axios
        .post("/decks", this.newDeckParams)
        .then((response) => {
          console.log("decks create", response.data);
          // localStorage.setItem("flashMessage", "Deck successfully created!");
          this.$router.push("/decks");
        })
        .catch((error) => {
          console.log("decks create error", error.response);
          this.sadStatus = error.response.status;
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="decks-new">
    <h1>Build a New Deck</h1>
    <form v-on:submit.prevent="createDeck()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="newDeckParams.name" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>
