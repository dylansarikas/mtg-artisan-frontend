import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import DecksIndex from "../views/DecksIndex.vue";
import DecksShow from "../views/DecksShow.vue";
import CardsIndex from "../views/CardsIndex.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/decks",
    name: "decks-index",
    component: DecksIndex,
  },
  {
    path: "/decks/:id",
    name: "decks-show",
    component: DecksShow,
  },
  {
    path: "/cards",
    name: "cards-index",
    component: CardsIndex,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
