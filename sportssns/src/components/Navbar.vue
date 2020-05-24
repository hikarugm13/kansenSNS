<template>
  <nav>
    <v-app-bar dense color="grey darken-3" height="70px" app>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-container >
        <v-row justify="center" 
        align="center">
          <v-col>
        <h2 class="my-2">
          <router-link class="white--text" :to="{ name: 'findGame' }"
            >Tailgate</router-link
          >
        </h2>
        </v-col>
          <!-- <v-col>
        <div class="mx-2 white--text">
          <router-link :to="{name:'findGame'}" >
          <v-btn  small color="primary" >試合検索</v-btn>
        </router-link>
          スポーツ観戦情報サイト
        </div>
        </v-col> -->
        <v-spacer></v-spacer>

        <div v-if="currentUser" class="mx-2">
          <v-btn small color="orange accent-4" @click="logUserOut">ログアウト</v-btn>
        </div>
        <router-link :to="{ name: 'signIn' }" v-if="!currentUser">
          <v-btn class="mx-2" small color="yellow lighten-1"
            >ログイン</v-btn
          ></router-link
        >

        <router-link
          :to="{ name: 'myPage', params: { id: currentUser.id } }"
          v-if="currentUser"
          ><v-btn small color="yellow lighten-1">マイページ</v-btn></router-link
        >
        </v-row>
      </v-container>
    </v-app-bar>
  </nav>
</template>

<script>
const user = JSON.parse(localStorage.getItem("user"));
export default {
  data() {
    return {
      // userId:this.$store.state.auth.user.id
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logUserOut() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      this.$store.dispatch("auth/logout", user);
      // console.log(this.$store.state.auth)
      this.$router.push("/");
    },
  },
};
</script>
