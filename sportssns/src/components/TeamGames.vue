<template>
  <div>
    <v-container class="text-center">
      <v-responsive class="mx-auto mb-3" width="56"> </v-responsive>
      <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'title'
                          : 'headline',
                      ]" class="font-weight-black pb-3" >このチームの試合</div>
      <v-responsive class="mx-auto mb-3" width="56">
        <v-divider class="mb-1"></v-divider>
        <!-- <v-divider></v-divider> -->
      </v-responsive>

 
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="4" v-for="game in teamGame" v-bind:key="game.id">
          <v-card class="py-12 px-4" color="grey lighten-5" tile hover>
            <v-card-title
              class="justify-center font-weight-black text-uppercase "
            >
              {{ game.homeTeamId }} VS {{ game.awayTeamId }}
            </v-card-title>
            <v-card-text class="subtitle-1">
              {{ game.gameDate }} at {{ game.stadiumName }}
            </v-card-text>

            <router-link
              v-bind:to="{ name: 'gameDetail', params: { id: game.id } }"
            >
              <v-btn color="grey darken-3 text--white" dark>
                <span>詳細</span>
              </v-btn>
            </router-link>
            <!-- <router-link v-bind:to="{ name : 'gameDetail', params : { id: game.id }}"></router-link> -->
          </v-card>
        </v-col>
      </v-row>

      <div></div>
    </v-container>
    <div class="py-6"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamGame: [],
    };
  },
  async mounted() {
    console.log(this.$route.params["teamName"])
    let response = await this.$http.get(
      "api/auth/findTeamGames",
      // .get("http://localhost:8080/api/auth/getTenReview",
      {
        params: {
          teamName: this.$route.params["teamName"],
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );
  
    this.teamGame = response.data.teamGame;
    console.log(this.teamGame);
  },
};
</script>
