<template>
  <div>
    <h1>GAME DETAIL</h1>
    <h2 class="card-title">{{game.homeTeamId}} VS {{game.awayTeamId}}</h2>
    <p class="card-text">{{game.gameDate}} at {{game.stadiumId}}</p>
 <router-link v-bind:to="{ name : 'postReview', params : { id: game.id }}" class="btn btn-primary" >REVIEWを書く
 </router-link>
 <gameReviews :id="game.id"/>
  </div>
  
</template>

<script>
import axios from 'axios';
import gameReviews from "@/components/GameReviews";
export default {
  components: {
    gameReviews
  },
  props: ["id"],
  data() {
    return {
      game: {}
    };
  },
  mounted(){
     axios.get('http://localhost:8080/api/auth/findGameDetail',
        {
          params:{
            id: this.id
          },
          headers: {
            token: localStorage.getItem("jwt")
          }
        })
        .then(response=>{
        this.game = response.data.game
        console.log(this.game)
         })
  }
};
</script>
