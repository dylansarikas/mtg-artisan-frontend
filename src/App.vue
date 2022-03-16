<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
  methods: {
    findUserId: function () {
      return localStorage.user_id;
    },
  },
};
</script>

<template>
  <div id="nav">
    <router-link to="/">MTG Artisan</router-link>
    |
    <router-link to="/decks">Decks</router-link>
    |
    <router-link to="/cards">Cards</router-link>
    |
    <router-link to="/decks/new">Deck Builder</router-link>
    |
    <router-link v-if="!isLoggedIn" to="/signup">Signup</router-link>
    |
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    |
    <router-link v-if="isLoggedIn" to="/logout">Logout</router-link>
    |
    <router-link v-if="isLoggedIn" :to="`/users/${findUserId()}`">My Decks</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
