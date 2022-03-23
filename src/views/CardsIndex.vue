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
          console.log("Multiverse ID", this.cards[0]["multiverse_ids"][0]);
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
  <section class="py-5 store-page">
    <div class="container">
      <div class="d-flex align-item-center title mb-3">
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
      </div>
      <div class="row">
        <div class="col-lg-3">
          <div class="filters rounded mb-4">
            <div class="filters-header border-bottom pb-4">
              <h6 class="m-0">Filter By</h6>
            </div>
            <div class="filters-body">
              <div id="accordion">
                <!-- <div class="filters-card border-bottom py-4">
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
                </div> -->
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
                        Card Search
                        <i class="feather-chevron-down float-right"></i>
                      </a>
                    </h6>
                  </div>
                  <!-- <form v-on:submit.prevent="indexCards()">
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
                  </form> -->
                  <div id="collapsetwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="filters-card-body card-shop-filters">
                      <form class="filters-search mb-3" v-on:submit.prevent="indexCards()">
                        <div class="form-group">
                          <i class="feather-search"></i>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Card Name"
                            v-model="newCardSearch.cardName"
                          />
                        </div>
                        <div class="form-group">
                          <i class="feather-search"></i>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Oracle Text"
                            v-model="newCardSearch.cardText"
                          />
                        </div>
                        <div class="form-group">
                          <i class="feather-search"></i>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Card Type"
                            v-model="newCardSearch.cardType"
                          />
                        </div>
                        Card Color
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="white"
                            v-model="newCardSearch.cardColor"
                          />
                          <label class="form-check-label" for="exampleRadios1">White</label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="blue"
                            v-model="newCardSearch.cardColor"
                          />
                          <label class="form-check-label" for="exampleRadios2">Blue</label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios3"
                            value="rlack"
                            v-model="newCardSearch.cardColor"
                          />
                          <label class="form-check-label" for="exampleRadios3">Black</label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios4"
                            value="red"
                            v-model="newCardSearch.cardColor"
                          />
                          <label class="form-check-label" for="exampleRadios4">Red</label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios5"
                            value="green"
                            v-model="newCardSearch.cardColor"
                          />
                          <label class="form-check-label" for="exampleRadios5">Green</label>
                        </div>
                        <br />
                        <button class="btn btn-outline-primary" type="submit">Submit</button>
                      </form>
                      <!-- <div class="custom-control custom-checkbox">
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
                      <div class="mt-2"><a href="#" class="link">See all</a></div> -->
                    </div>
                  </div>
                </div>
                <!-- <div class="filters-card py-4">
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
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row">
            <div class="col-lg-3 col-md-6" v-for="card in cards" v-bind:key="card.id">
              <div class="osahan-card">
                <!-- <a href="store-single.html"> -->
                <div v-if="!!card['image_uris']">
                  <img class="img-fluid" img v-bind:src="`${card['image_uris']['normal']}`" alt="" />
                  <div class="osahan-card-body mt-3">
                    <h6 class="text-white mb-1">{{ card["name"] }}</h6>
                    <!-- <p class="mb-0 text-white-50">Free Now - Jun 25 at 08:30 PM</p> -->
                    <div class="price mt-3">
                      <!-- <div class="bg-primary d-inline-block text-center px-2 py-1 text-white">-20%</div> -->
                      <!-- <s class="text-white-50 mx-1">$34.99</s> -->
                      <!-- <span class="text-white">$27.99</span> -->
                    </div>
                  </div>
                </div>
                <div v-else-if="!!card['card_faces']">
                  <img class="img-fluid" img v-bind:src="`${card['card_faces'][0]['image_uris']['normal']}`" alt="" />
                  <div class="osahan-card-body mt-3">
                    <h6 class="text-white mb-1">{{ card["name"] }}</h6>
                    <!-- <p class="mb-0 text-white-50">Free Now - Jun 25 at 08:30 PM</p> -->
                    <div class="price mt-3">
                      <!-- <div class="bg-primary d-inline-block text-center px-2 py-1 text-white">-20%</div> -->
                      <!-- <s class="text-white-50 mx-1">$34.99</s> -->
                      <!-- <span class="text-white">$27.99</span> -->
                    </div>
                  </div>
                </div>

                <!-- </a> -->
              </div>
            </div>
            <div class="col-lg-12 text-center">
              <a href="#" class="btn btn-light btn-lg">Load More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <div class="cards-search-index">
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
      <div v-if="!!cards[0]['multiverse_ids'][0]">
        <div v-for="card in cards" v-bind:key="card.id">
          <div v-if="!!card['image_uris']">
            <p>{{ card["name"] }}</p>
            <img v-bind:src="`${card['image_uris']['small']}`" class="card-img-top" alt="" />
          </div>
          <div v-else-if="!!card['card_faces']">
            <p>{{ card["name"] }}</p>
            <img v-bind:src="`${card['card_faces'][0]['image_uris']['small']}`" class="card-img-top" alt="" />
            <img v-bind:src="`${card['card_faces'][1]['image_uris']['small']}`" class="card-img-top" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div> -->

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
