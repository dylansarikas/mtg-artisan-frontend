<script>
/* global bootstrap */
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
      updateAmount: {},
      hover: false,
    };
  },
  created: function () {
    this.showDeck();
  },
  methods: {
    showDeck: function () {
      axios.get("/decks/" + this.$route.params.id).then((response) => {
        console.log("decks show", response);
        this.deck = response.data;
      });
    },
    createCardDeck: function (card) {
      //console.log(this.cards[0]);
      this.newCardDeckParams["deck_id"] = this.$route.params.id;
      this.newCardDeckParams["multiverse_id"] = card.multiverse_ids[0];
      this.newCardDeckParams["amount"] = parseInt(this.amount);
      // console.log(this.newCardDeckParams);
      axios
        .post("/card_decks", this.newCardDeckParams)
        .then((response) => {
          console.log("cardDeck create", response);
          console.log(card);
          // this deck push blah
          // this.deck["card_decks"].push(card);
          this.showDeck();
        })
        .catch((error) => {
          console.log("cardDeck create error", error.response);
          // this.errors = error.response.data.errors;
        });
    },
    updateCardDeck: function (card) {
      this.updateAmount["amount"] = parseInt(this.amount);
      axios
        .patch("/card_decks/" + card.id, this.updateAmount)
        .then((response) => {
          console.log("cardDeck create", response);
          console.log(card);
          var updateCardDeckAmount = bootstrap.Modal.getInstance(document.getElementById("updateCardDeckAmount")); // Returns a Bootstrap modal instance
          updateCardDeckAmount.hide();
          this.showDeck();
        })
        .catch((error) => {
          console.log("cardDeck create error", error.response);
          // this.errors = error.response.data.errors;
        });
    },
    destroyCardDecks: function (card) {
      axios
        .delete("/card_decks/" + card.id)
        .then((response) => {
          console.log("cardDeck destroy", response.data);
          this.showDeck();
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
  <!-- <h2>{{ deck.name }}</h2>
  <div v-for="card_deck in deck.card_decks" v-bind:key="card_deck.id">
    <span class="container">
      <p class="hover-text">{{ `${card_deck["card"]["name"]}: ${card_deck["amount"]}` }}</p>
      <img class="manImg" img v-bind:src="`${card_deck['card']['image']}`" />
    </span>
  </div> -->
  <section class="py-5 store-page">
    <div id="Collapse" class="pb-5 mb-5 border-bottom">
      <h2 class="h5">{{ deck.name }}</h2>
      <router-link v-bind:to="`/users/${deck.user.id}`">
        <h5>{{ deck.user.username }}</h5>
      </router-link>
      <p>
        <a
          class="btn btn-primary"
          data-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Expand Deck
        </a>
        <!-- <button
          class="btn btn-primary"
          type="button"
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Button with data-target
        </button> -->
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body" v-for="card_deck in deck.card_decks" v-bind:key="card_deck.id">
          <span class="container">
            <p class="hover-text">{{ `${card_deck["card"]["name"]}: ${card_deck["amount"]}` }}</p>
            <img class="manImg" img v-bind:src="`${card_deck['card']['image']}`" />
          </span>
          <br />
          <!-- <p>{{ `${card_deck["card"]["name"]}: ${card_deck["amount"]}` }}</p> -->
          <div id="Buttons" v-if="deck.owner">
            <button type="button" class="btn btn-outline-danger" v-on:click="destroyCardDecks(card_deck)">
              Delete
            </button>
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-outline-warning"
              data-toggle="modal"
              data-target="#updateCardDeckAmount"
            >
              Update
            </button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="updateCardDeckAmount"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLongTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Update Card Amount</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form v-on:submit.prevent="updateCardDeck(card_deck)">
                      <ul>
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                      </ul>
                      <div>
                        <input type="number" v-model="amount" />
                      </div>
                      <button class="btn btn-outline-primary" type="submit">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <!-- <form v-on:submit.prevent="createCardDeck(card)">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div v-if="!!cards[0]">
                <div v-if="!!cards[0]['name']">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Amount"
                      aria-label="Amount"
                      aria-describedby="button-addon2"
                      v-model="amount"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </form> -->
          </div>
        </div>
      </div>
      <!-- <p>
        <a
          class="btn btn-primary"
          data-toggle="collapse"
          href="#multiCollapseExample1"
          role="button"
          aria-expanded="false"
          aria-controls="multiCollapseExample1"
        >
          Toggle first element
        </a>
        <button
          class="btn btn-primary"
          type="button"
          data-toggle="collapse"
          data-target="#multiCollapseExample2"
          aria-expanded="false"
          aria-controls="multiCollapseExample2"
        >
          Toggle second element
        </button>
        <button
          class="btn btn-primary"
          type="button"
          data-toggle="collapse"
          data-target=".multi-collapse"
          aria-expanded="false"
          aria-controls="multiCollapseExample1 multiCollapseExample2"
        >
          Toggle both elements
        </button>
      </p> -->
      <!-- <div class="row">
        <div class="col">
          <div class="collapse multi-collapse" id="multiCollapseExample1">
            <div class="card card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
              keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
          </div>
        </div>
        <div class="col">
          <div class="collapse multi-collapse" id="multiCollapseExample2">
            <div class="card card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
              keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
          </div>
        </div>
      </div>
      <hr /> -->
      <!-- <div id="accordion">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Collapsible Group Item #1
              </button>
            </h5>
          </div>
          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
              moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
              shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
              proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
              <button
                class="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Collapsible Group Item #2
              </button>
            </h5>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
              moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
              shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
              proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingThree">
            <h5 class="mb-0">
              <button
                class="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Collapsible Group Item #3
              </button>
            </h5>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
              moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
              shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
              proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div v-if="deck.owner" class="container">
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
                            v-model="newCardParams.cardName"
                          />
                        </div>
                        <div class="form-group">
                          <i class="feather-search"></i>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Oracle Text"
                            v-model="newCardParams.cardText"
                          />
                        </div>
                        <div class="form-group">
                          <i class="feather-search"></i>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Card Type"
                            v-model="newCardParams.cardType"
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
                            v-model="newCardParams.cardColor"
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
                            v-model="newCardParams.cardColor"
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
                            v-model="newCardParams.cardColor"
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
                            v-model="newCardParams.cardColor"
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
                            v-model="newCardParams.cardColor"
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
                      <form v-on:submit.prevent="createCardDeck(card)">
                        <ul>
                          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                        </ul>
                        <div v-if="!!cards[0]">
                          <div v-if="!!cards[0]['name']">
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Amount"
                                aria-label="Amount"
                                aria-describedby="button-addon2"
                                v-model="amount"
                              />
                              <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Add</button>
                              </div>
                            </div>
                            <!-- <label for="cardAmount">Add Copies</label>
                            <input type="text" id="cardAmount" v-model="amount" />
                            <input type="submit" value="Add" /> -->
                          </div>
                        </div>
                      </form>
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
                      <form v-on:submit.prevent="createCardDeck(card)">
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
                      <!-- <div class="bg-primary d-inline-block text-center px-2 py-1 text-white">-20%</div> -->
                      <!-- <s class="text-white-50 mx-1">$34.99</s> -->
                      <!-- <span class="text-white">$27.99</span> -->
                    </div>
                  </div>
                </div>

                <!-- </a> -->
              </div>
            </div>
            <!-- <div class="col-lg-12 text-center">
              <a href="#" class="btn btn-light btn-lg">Load More</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <div class="decks-show">
    <h2>{{ deck.name }}</h2>
    <div v-for="card_deck in deck.card_decks" v-bind:key="card_deck.id">
      <p>{{ `${card_deck["card"]["name"]}: ${card_deck["amount"]}` }}</p>
    </div>
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
              <form v-on:submit.prevent="createCardDeck(card)">
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
          <div v-else-if="!!card['card_faces']">
            <p>{{ card["name"] }}</p>
            <img v-bind:src="`${card['card_faces'][0]['image_uris']['small']}`" class="card-img-top" alt="" />
            <img v-bind:src="`${card['card_faces'][1]['image_uris']['small']}`" class="card-img-top" alt="" />
            <div class="cardDecks-new">
              <form v-on:submit.prevent="createCardDeck(card)">
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
  </div> -->
</template>

<style>
.container {
  display: inline-block;
}
.manImg {
  display: none;
}
.hover-text:hover ~ .manImg {
  display: block;
}
</style>
