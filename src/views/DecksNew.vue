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
          // this.$router.push(`/users/${response.data.user.id}`);
          this.$router.push(`/decks/${response.data.id}`);
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
  <div class="login">
    <div class="container">
      <div class="row justify-content-center align-items-center d-flex vh-100">
        <div class="col-lg-5 mx-auto">
          <div class="osahan-login p-5 bg-dark">
            <div class="text-center mb-4">
              <a href="index.html"><img src="/img/artisan.png" alt="" /></a>
              <h5 class="font-weight-bold mt-3">Create a New Deck</h5>
              <p class="text-white-50">An Uncommon Experience</p>
            </div>
            <form action="index.html" v-on:submit.prevent="createDeck()">
              <div class="form-group">
                <label class="mb-1">Deck Name</label>
                <div class="position-relative icon-form-control">
                  <input type="text" class="form-control" v-model="newDeckParams.name" />
                </div>
              </div>

              <button class="btn btn-warning btn-lg btn-block text-uppercase" type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

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
