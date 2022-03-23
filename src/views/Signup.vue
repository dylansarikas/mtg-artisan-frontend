<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
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
              <a href="index.html"><img src="/img/logo.svg" alt="" /></a>
              <h5 class="font-weight-bold mt-3">Join MTG Artisan</h5>
              <p class="text-white-50">An Uncommon Experience</p>
            </div>
            <form action="index.html" v-on:submit.prevent="submit()">
              <div class="form-group">
                <label class="mb-1">Username</label>
                <div class="position-relative icon-form-control">
                  <input type="text" class="form-control" v-model="newUserParams.username" />
                </div>
              </div>
              <div class="form-group">
                <label class="mb-1">Email</label>
                <div class="position-relative icon-form-control">
                  <input type="email" class="form-control" v-model="newUserParams.email" />
                </div>
              </div>
              <div class="form-group">
                <label class="mb-1">Password (6 or more characters)</label>
                <div class="position-relative icon-form-control">
                  <input type="password" class="form-control" v-model="newUserParams.password" />
                </div>
              </div>
              <div class="form-group">
                <label class="mb-1">Password Confirmation</label>
                <div class="position-relative icon-form-control">
                  <input type="password" class="form-control" v-model="newUserParams.password_confirmation" />
                </div>
              </div>
              <!-- <div class="form-group">
                <label class="mb-1">
                  You agree to the Jordo
                  <a class="text-white-50" href="#">User Agreement</a>
                  ,
                  <a class="text-white-50" href="#">Privacy Policy</a>
                  , and
                  <a class="text-white-50" href="#">Cookie Policy</a>
                  .
                </label>
              </div> -->
              <button class="btn btn-warning btn-lg btn-block text-uppercase" type="submit">Join</button>
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
                  Already on Jordo?
                  <a class="text-white-50" href="sign-in.html">Sign in</a>
                </span>
              </div> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Userame:</label>
        <input type="text" v-model="newUserParams.username" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div> -->
</template>
