<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="signUpUser"
        >
          <input
            type="text"
            id="name"
            class="form-control mb-5"
            placeholder="Name"
            v-model="signUp.username"
            required
          />
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="signUp.email"
            required
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="signUp.password"
          />
          <p>
            アカウントをお持ちですか?
            <router-link :to="{name:'signIn'}">click here</router-link>
            <!-- Sign in button -->
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Sign in
              </button>
            </center>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      signUp: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async signUpUser() {
      try {
        let response = await this.$http.post("api/auth/signup", this.signUp);
        console.log(response);
        this.$router.push("/");
      } catch (err) {
        let error = err.response;
        if (error.status == 400) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    }
  }
};
</script>
