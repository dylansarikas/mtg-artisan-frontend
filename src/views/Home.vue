<script>
import axios from "axios";
export default {
  data: function () {
    return {
      decks: [],
      recentDecks: [],
    };
  },
  created: function () {
    axios.get("/decks").then((response) => {
      console.log("decks index", response);
      this.decks = response.data;
      var recent = 8;
      while (recent > 0) {
        this.recentDecks.push(this.decks[this.decks.length - recent]);
        recent = recent - 1;
      }
    });
  },
  methods: {},
};
</script>

<template>
  <div class="card text-white bg-dark mb-3">
    <div class="card-body">
      <h2 class="card-title">Welcome to MTG Artisan</h2>
      <h4 class="card-text text-white">Artisan is a Magic: The Gathering Format using only Commons and Uncommons</h4>
    </div>
  </div>
  <div class="decks-index">
    <section class="py-5 store-page">
      <h5 class="card-text text-white">8 Recent Decks</h5>
      <div class="container">
        <!-- <div class="d-flex align-item-center title mb-3">
          <h5 class="m-0 font-weight-normal">
            All Stores -
            <span class="text-white-50">3445</span>
          </h5>
          <div class="ml-auto d-flex align-items-center">
            Sort By:
            <div class="dropdown ml-2">
              <button
                class="btn btn-sm btn-outline-light dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Release Date
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button">Relevance</button>
                <button class="dropdown-item" type="button">Alphabetical</button>
              </div>
            </div>
          </div>
        </div> -->
        <div class="row">
          <div class="col-lg-3">
            <!-- <div class="filters rounded mb-4">
              <div class="filters-header border-bottom pb-4">
                <h6 class="m-0">Filter By</h6>
              </div>
              <div class="filters-body">
                <div id="accordion">
                  <div class="filters-card border-bottom py-4">
                    <div class="filters-card-header" id="headingOne">
                      <h6 class="mb-0">
                        <a
                          href="#"
                          class="btn-link"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          CATEGORIES
                          <i class="feather-chevron-down float-right"></i>
                        </a>
                      </h6>
                    </div>
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="filters-card-body card-shop-filters">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb1" />
                          <label class="custom-control-label" for="cb1">Action</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb2" />
                          <label class="custom-control-label" for="cb2">Adventure</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb3" />
                          <label class="custom-control-label" for="cb3">Mod Toolkit</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb4" />
                          <label class="custom-control-label" for="cb4">Puzzle</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb3" />
                          <label class="custom-control-label" for="cb3">Racing</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb4" />
                          <label class="custom-control-label" for="cb4">RPG</label>
                        </div>
                        <div class="mt-2"><a href="#" class="link">See all</a></div>
                      </div>
                    </div>
                  </div>
                  <div class="filters-card border-bottom py-4">
                    <div class="filters-card-header" id="headingTwo">
                      <h6 class="mb-0">
                        <a
                          href="#"
                          class="btn-link"
                          data-toggle="collapse"
                          data-target="#collapsetwo"
                          aria-expanded="true"
                          aria-controls="collapsetwo"
                        >
                          FEATURES
                          <i class="feather-chevron-down float-right"></i>
                        </a>
                      </h6>
                    </div>
                    <div id="collapsetwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                      <div class="filters-card-body card-shop-filters">
                        <form class="filters-search mb-3">
                          <div class="form-group">
                            <i class="feather-search"></i>
                            <input type="text" class="form-control" placeholder="Search" />
                          </div>
                        </form>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb6" />
                          <label class="custom-control-label" for="cb6">Controller Support</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb7" />
                          <label class="custom-control-label" for="cb7">Co-op</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb8" />
                          <label class="custom-control-label" for="cb8">Single Player</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb9" />
                          <label class="custom-control-label" for="cb9">Multiplayer</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb10" />
                          <label class="custom-control-label" for="cb10">Windows</label>
                        </div>
                        <div class="mt-2"><a href="#" class="link">See all</a></div>
                      </div>
                    </div>
                  </div>
                  <div class="filters-card py-4">
                    <div class="filters-card-header" id="headingCategory">
                      <h6 class="mb-0">
                        <a
                          href="#"
                          class="btn-link"
                          data-toggle="collapse"
                          data-target="#collapseCategory"
                          aria-expanded="true"
                          aria-controls="collapseCategory"
                        >
                          Stores
                          <i class="feather-chevron-down float-right"></i>
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseCategory"
                      class="collapse"
                      aria-labelledby="headingCategory"
                      data-parent="#accordion"
                    >
                      <div class="filters-card-body card-shop-filters">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb1" />
                          <label class="custom-control-label" for="cb1">MakeMyTrip</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb2" />
                          <label class="custom-control-label" for="cb2">Dominos</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb3" />
                          <label class="custom-control-label" for="cb3">Amazon</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb4" />
                          <label class="custom-control-label" for="cb4">Myntra</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cb5" />
                          <label class="custom-control-label" for="cb5">OYO Rooms</label>
                        </div>
                        <div class="mt-2"><a href="#" class="link">See all</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
          <!-- BOXES HERE BOXES HERE BOXES HERE BOXES HERE BOXES HERE BOXES HERE BOXES HERE -->
          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-3 col-md-6" v-for="recentDeck in recentDecks" v-bind:key="recentDeck.id">
                <div class="osahan-card">
                  <router-link v-bind:to="`/decks/${recentDeck.id}`">
                    <img class="img-fluid" v-bind:src="`${recentDeck.first_card['image']}`" alt="" />
                    <div class="osahan-card-body mt-3">
                      <h6 class="text-white mb-1">{{ recentDeck.name }}</h6>
                      <!-- <p class="mb-0 text-white-50">Free Now - Jun 25 at 08:30 PM</p> -->
                      <div class="price mt-3">
                        <!-- <div class="bg-primary d-inline-block text-center px-2 py-1 text-white">-20%</div> -->
                        <!-- <s class="text-white-50 mx-1">$34.99</s> -->
                        <span class="text-white">by {{ recentDeck.user.username }}</span>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <!-- <div class="col-lg-12 text-center">
                <a href="#" class="btn btn-light btn-lg">Load More</a>
              </div> -->
            </div>
          </div>
          <!-- BOXES HERE BOXES HERE BOXES HERE BOXES HERE BOXES HERE BOXES HERE BOXES HERE -->
        </div>
      </div>
    </section>
    <!-- <h1>Eight Recent Decks</h1>
    <div v-for="recentDeck in recentDecks" v-bind:key="recentDeck.id">
      <router-link v-bind:to="`/decks/${recentDeck.id}`">
        <h2>{{ recentDeck.name }}</h2>
      </router-link>
      <router-link v-bind:to="`/users/${recentDeck.user.id}`">
        <p>{{ recentDeck.user.username }}</p>
      </router-link>
      <img v-bind:src="`${recentDeck.first_card['image']}`" class="card-img-top" alt="" />
    </div> -->
  </div>
</template>

<style></style>
