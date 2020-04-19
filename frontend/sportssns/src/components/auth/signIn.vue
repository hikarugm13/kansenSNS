<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="signInUser"
        >
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="signIn.email"
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="signIn.password"
          />
          <p>
            Dont have an account??
            <router-link to="/signUp">click here</router-link>
          </p>
          <!-- Sign in button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">Sign in</button>
          </center>
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
      signIn: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
        async signInUser(){
       try {
        let response = await this.$http.post("api/auth/signin", this.signIn);
        let token = response.data.token;
        let user = response.data
        localStorage.setItem("jwt", token);
        localStorage.setItem("user",JSON.stringify(user));
          // console.log(user)
        if (token) {
          swal("Success", "Login Successful", "Error");
          this.$store.dispatch("auth/login",user)
          this.$router.push("/findGame");
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
      

    }
    // signInUser() {
    //   axios.post('http://localhost:8080/api/auth/signin', this.signIn)
    //     .then(res => {
    //       //if successfull
    //       if (res.status === 200) {
    //         console.log(res)
    //         localStorage.setItem('jwt', res.data.token);
    //         this.$router.push('/home');
    //       }
    //     }, err => {
    //       console.log(err.response);
    //       this.error = err.response.data.error
    //     })

  }
};
</script>