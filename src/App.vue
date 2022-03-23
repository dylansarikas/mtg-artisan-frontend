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
  <!-- Navigation -->
  <nav class="navbar navbar-expand navbar-dark bg-dark osahan-nav-top p-0 px-2 sticky-top">
    <div class="container">
      <router-link class="navbar-brand mr-2" to="/"><img src="/img/logo.svg" alt="" /></router-link>
      <!-- <router-link to="/">MTG Artisan</router-link> -->
      <!-- <form class="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
        <div class="input-group">
          <input
            type="text"
            class="form-control shadow-none border-0"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-light" type="button">
              <i class="feather-search"></i>
            </button>
          </div>
        </div>
      </form> -->
      <ul class="navbar-nav ml-auto d-flex align-items-center">
        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
        <li class="nav-item dropdown no-arrow d-sm-none">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="feather-search mr-2"></i>
          </a>
          <!-- Dropdown - Messages -->
          <div
            class="dropdown-menu dropdown-menu-right p-3 shadow-sm animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form class="form-inline mr-auto w-100 navbar-search">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control border-0 shadow-none"
                  placeholder="Search people, jobs and more..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn" type="button">
                    <i class="feather-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
        <li class="nav-item dropdown mr-2">
          <a
            class="nav-link dropdown-toggle pr-0"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Decks
          </a>
          <!-- Dropdown - User Information -->
          <!-- <router-link to="/decks/new">Deck Builder</router-link> -->
          <!-- <router-link to="/decks">Decks</router-link> -->
          <div class="dropdown-menu dropdown-menu-right shadow-sm">
            <router-link class="dropdown-item" to="/decks/new">Deck Builder</router-link>
            <router-link class="dropdown-item" to="/decks">Decks</router-link>
          </div>
        </li>
        <li class="nav-item dropdown mr-2">
          <a
            class="nav-link dropdown-toggle pr-0"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Cards
          </a>
          <!-- Dropdown - User Information -->
          <!-- <router-link to="/cards">Cards</router-link> -->
          <!-- <router-link to="/">MTG Artisan</router-link> -->
          <div class="dropdown-menu dropdown-menu-right shadow-sm">
            <router-link class="dropdown-item" to="/">Home</router-link>
            <router-link class="dropdown-item" to="/cards">Cards</router-link>
          </div>
        </li>
        <li class="nav-item dropdown mr-2">
          <a
            class="nav-link dropdown-toggle pr-0"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            My Account
          </a>
          <!-- Dropdown - User Information -->
          <!-- <router-link v-if="!isLoggedIn" to="/signup">Signup</router-link>
          <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
          <router-link v-if="isLoggedIn" to="/logout">Logout</router-link>
          <router-link v-if="isLoggedIn" :to="`/users/${findUserId()}`">My Decks</router-link> -->
          <div class="dropdown-menu dropdown-menu-right shadow-sm">
            <router-link class="dropdown-item" v-if="isLoggedIn" :to="`/users/${findUserId()}`">My Decks</router-link>
            <router-link class="dropdown-item" v-if="!isLoggedIn" to="/login">Login</router-link>
            <router-link class="dropdown-item" v-if="isLoggedIn" to="/logout">Logout</router-link>
            <router-link class="dropdown-item" v-if="!isLoggedIn" to="/signup">Sign Up</router-link>
          </div>
        </li>

        <!-- Nav Item - User Information -->
        <!-- <li class="nav-item dropdown no-arrow ml-1 osahan-profile-dropdown">
          <a
            class="nav-link dropdown-toggle pr-0"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img class="img-profile rounded-circle" src="img/p13.png" />
          </a> -->
        <!-- Dropdown - User Information -->
        <!-- <div class="dropdown-menu dropdown-menu-right shadow-sm">
            <div class="p-3 d-flex align-items-center">
              <div class="dropdown-list-image mr-3">
                <img class="rounded-circle" src="img/user.png" alt="" />
                <div class="status-indicator bg-success"></div>
              </div>
              <div class="font-weight-bold">
                <div class="text-truncate">Gurdeep Osahan</div>
                <div class="small text-gray-500">UI/UX Designer</div>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="account.html">
              <i class="feather-edit mr-1"></i>
              My Account
            </a>
            <a class="dropdown-item" href="favorite.html">
              <i class="feather-heart mr-1"></i>
              Favorite
            </a>
            <a class="dropdown-item" href="coupons.html">
              <i class="feather-user mr-1"></i>
              Coupons
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="sign-in.html">
              <i class="feather-log-out mr-1"></i>
              Logout
            </a>
          </div> -->
        <!-- </li> -->
      </ul>
    </div>
  </nav>
  <!-- Navigation -->
  <!-- <div id="nav">
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
  </div> -->
  <body>
    <router-view />
  </body>
</template>
