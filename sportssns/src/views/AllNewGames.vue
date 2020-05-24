<template>
  <div>
    <section id="games" class="grey lighten-4">
      <v-container class="text-center">
        <v-responsive class="mx-auto mb-3" width="56"> </v-responsive>
        <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'title'
                          : 'headline',
                      ]" class="font-weight-black pb-3" >直近行われる試合</div>
        <v-responsive class="mx-auto mb-3" width="56">
          <v-divider class="mb-1"></v-divider>
          <!-- <v-divider></v-divider> -->
        </v-responsive>

        <v-row>
          <v-col cols="12" md="4" v-for="game in newGames" v-bind:key="game.id">
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

      <div class="py-12"></div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newGames: [],
    };
  },
  async mounted() {
    let response = await this.$http.get(
      "api/auth/findAllNewGames",
      // .get("http://localhost:8080/api/auth/getTenReview",
      {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );
    this.newGames = response.data.allNewGame;
    console.log(this.newGames);
  },
};
</script>
