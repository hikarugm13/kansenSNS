<template>
  <nav>
    <v-toolbar dense color="light-blue accent-3" height="70">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <h2 class="my-2"><router-link class="white--text" to="/findGame" >KANSEN</router-link></h2>
      <div class="mx-2">
        <v-btn to="/findGame" small color="primary" >FindGame</v-btn>
      </div>
      <v-spacer></v-spacer>

      <div v-if="currentUser" class="mx-2">
        <v-btn small color="error" @click="logUserOut">Logout</v-btn>
      </div>
      <v-btn v-if="!currentUser" class="mx-2" to="/" small color="primary">Login</v-btn>
      <v-btn v-if="currentUser" v-bind:to="{ name: 'myPage', params: { id: currentUser.id } }" small color="primary">MYPAGE</v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
const user = JSON.parse(localStorage.getItem('user'));
export default {
  data() {
    return{
    // userId:this.$store.state.auth.user.id
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logUserOut() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      this.$store.dispatch("auth/logout",user)
      // console.log(this.$store.state.auth)
      this.$router.push("/findGame");
    },
  },
};
</script>
