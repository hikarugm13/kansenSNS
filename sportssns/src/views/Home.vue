<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">KANSEN</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" @click="logUserOut"> Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">Name : {{ user.name }}</li>
              <li class="list-group-item">Email : {{ user.email }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// import axios from 'axios';

export default {
  data() {
    return {
      user: {}
    };
  },
  async mounted(){
    let response = await this.$http.get("api/auth/user",
    // axios.get('http://localhost:8080/api/auth/user',
    {headers:{
      token:localStorage.getItem('jwt')}})
      
   
      this.user =res.data.user
  },
  methods: {
    // getUserDetails() {
    //   let token = localStorage.getItem("jwt");
    //   let decoded = VueJwtDecode.decode(token);
    //   console.log(token)
    //   this.user = decoded;
    //   console.log(this.user.name)
    // },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  },
  // created() {
  //   this.getUserDetails();
  // }
};
</script>
<style scoped></style>