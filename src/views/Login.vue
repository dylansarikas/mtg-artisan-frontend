<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
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
              <a href="index.html"><img src="/img/logo.svg" alt="" /></a>
              <h5 class="font-weight-bold mt-3">Welcome Back</h5>
              <p class="text-white-50">An Uncommon Experience</p>
            </div>
            <form action="index.html" v-on:submit.prevent="submit()">
              <div class="form-group">
                <label class="mb-1">Email</label>
                <div class="position-relative icon-form-control">
                  <input type="email" class="form-control" v-model="newSessionParams.email" />
                </div>
              </div>
              <div class="form-group">
                <label class="mb-1">Password</label>
                <div class="position-relative icon-form-control">
                  <input type="password" class="form-control" v-model="newSessionParams.password" />
                </div>
              </div>
              <!-- <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                <label class="custom-control-label text-white-50" for="customCheck1">Remember password</label>
              </div> -->
              <button class="btn btn-warning btn-lg btn-block text-uppercase" type="submit">Log in</button>
              <!-- <div class="text-center mt-3 border-bottom pb-3">
                <p class="small text-muted">Or login with</p>
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-outline-instagram bg-dark-2 btn-block">
                      <i class="feather-instagram"></i>
                      Instagram
                    </button>
                  </div>
                  <div class="col-6">
                    <button type="button" class="btn btn-outline-facebook bg-dark-2 btn-block">
                      <i class="feather-facebook"></i>
                      Facebook
                    </button>
                  </div>
                </div>
              </div> -->
              <!-- <div class="py-3 d-flex align-item-center">
                <a class="text-white-50" href="forgot-password.html">Forgot password?</a>
                <span class="ml-auto">
                  New to Jordo?
                  <a class="text-white-50" href="sign-up.html">Join now</a>
                </span>
              </div> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="login">
    <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newSessionParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newSessionParams.password" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div> -->
</template>
