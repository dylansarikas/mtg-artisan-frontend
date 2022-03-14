import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import DecksIndex from "../views/DecksIndex.vue";
import DecksShow from "../views/DecksShow.vue";
import CardsIndex from "../views/CardsIndex.vue";
import DecksNew from "../views/DecksNew.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UserShow from "../views/UserShow.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  {
    path: "/decks/new",
    name: "decks-new",
    component: DecksNew,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/users/:id",
    name: "user-show",
    component: UserShow,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
