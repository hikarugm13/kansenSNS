<template>

  <div class="container">
    <h1>FIND YOUR GAME!</h1>
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="findGame"
        >
          <input
            type="text"
            class="form-control mb-5"
            placeholder="text"
            v-model="parameters.sports"
          />

          <!-- Sign in button -->
          <center>
            <!-- <button @click="findGame">login</button> -->
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Find a Game!
            </button>
          </center>
        </form>
         </div>
    </div>
        <div class="card col-lg-6 offset-lg-3 col-sm-10 offset-sm-1"  v-for="game in games" v-bind:key="game.gameId">
  <img class="card-img-top" src="" alt="カードの画像">
  <div class="card-body">
    <h5 class="card-title">{{game.homeTeamId}} VS {{game.awayTeamId}}</h5>
    <p class="card-text">{{game.gameDate}} at {{game.stadiumId}}</p>
    <router-link v-bind:to="{ name : 'gameDetail', params : { id: game.id }}" class="btn btn-primary" >詳細</router-link>
  <!-- <router-link v-bind:to="{ name : 'gameDetail', params : { id: game.id }}"></router-link> -->
  </div>
</div>
        <!-- <div v-for="game in games" v-bind:key="game.gameId">
          {{game.homeTeamId}}:
        </div> -->
  </div>
</template>
<script>
// import swal from "sweetalert";

export default {
  data() {
    return {
      parameters: {
        sports: ""
      },
      games: [
      ],
    };
  },
  methods: {
    async findGame() {
      let response = await this.$http.get(
        "api/auth/findGame",
        {
          params:{
            sportsName: this.parameters.sports
          },
          headers: {
            token: localStorage.getItem("jwt")
          }
          
        }
        
      );
      
      this.games = response.data.game;
      console.log(this.games)
    }
    // import axios from 'axios';
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
