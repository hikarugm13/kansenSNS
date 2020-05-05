<template>
<v-app>
  <v-content class="grey lighten-4">
    <v-container >
      <v-row>
        <v-col cols="12">
          <v-card
          class="white lighten-4 p-5"
            dark tile
          >
   <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          <router-link
          v-bind:to="{
            name: 'teamInfo',
            params: { teamName: game.homeTeamId }
          }" 
          class="black--text"
          ><h1 >{{ game.homeTeamId }}</h1></router-link
        >
        <h2 class="red--text">VS</h2>
        <router-link
          v-bind:to="{
            name: 'teamInfo',
            params: { teamName: game.awayTeamId }
          }"
          class="black--text"
          ><h1>{{ game.awayTeamId }}</h1>
        </router-link>
        </v-list-item-title>
        <v-list-item-subtitle>
          <h2 class="card-text grey--text" >{{ game.gameDate }} at <router-link
          v-bind:to="{
            name: 'stadiumDetail',
            params: { stadiumId: game.stadiumId }
          }" 
          class="black--text"
          >{{ game.stadiumName }}</router-link></h2></v-list-item-subtitle>
              <v-list-item-subtitle>
              <v-btn
          v-bind:to="{ name: 'postReview', params: { id: game.id } }"
          color="success" 
          class="mx-1"
          v-if="currentUser"
          >REVIEWを書く
        </v-btn>
        <v-btn
          v-bind:to="{ name: 'gameChat', params: { gameId: game.id } }"
          color="indigo"
          
          v-if="currentUser"
          >Chatする
        </v-btn>
        </v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
        <gameReviews :id="game.id" />
  </v-content>
</v-app>

</template>

<script>
// import axios from "axios";
import gameReviews from "@/components/GameReviews";
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  components: {
    gameReviews,
  },
  props: ["id"],
  data() {
    return {
      game: {}
    };
  },
  async mounted() {
     console.log(this.id)
let response = await this.$http.get("api/auth/findGameDetail",
      // .get("http://localhost:8080/api/auth/findGameDetail", 
      {
        params: {
          id: this.id
        },
        headers: {
          token: localStorage.getItem("jwt")
        }
      })
     
        this.game = response.data.game;
        console.log(this.game);

  }
};
</script>
<style></style>
