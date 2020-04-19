<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <h1>GAME DETAIL</h1>
        <router-link
          v-bind:to="{
            name: 'teamInfo',
            params: { teamName: this.game.homeTeamId }
          }"
          >{{ game.homeTeamId }}</router-link
        >
        <p>VS</p>
        <router-link
          v-bind:to="{
            name: 'teamInfo',
            params: { teamName: game.awayTeamId }
          }"
          v-if="currentUser"
          >{{ game.awayTeamId }}
        </router-link>
        <p class="card-text">{{ game.gameDate }} at {{ game.stadiumId }}</p>
        <router-link
          v-bind:to="{ name: 'postReview', params: { id: game.id } }"
          class="btn btn-primary"
          v-if="currentUser"
          >REVIEWを書く
        </router-link>
        <router-link
          v-bind:to="{ name: 'gameChat', params: { gameId: game.id } }"
          class="btn btn-primary"
          v-if="currentUser"
          >Chatする
        </router-link>
        <gameReviews :id="game.id" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import gameReviews from "@/components/GameReviews";
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  components: {
    gameReviews
  },
  props: ["id"],
  data() {
    return {
      game: {}
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/auth/findGameDetail", {
        params: {
          id: this.id
        },
        headers: {
          token: localStorage.getItem("jwt")
        }
      })
      .then(response => {
        this.game = response.data.game;
        console.log(this.game);
      });
  }
};
</script>
<style></style>
