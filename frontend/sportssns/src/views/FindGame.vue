<template>
  <v-app>
    <v-content>
      <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            src=""
          >
            <v-theme-provider>
                <v-container fill-height>
              <v-form
                class="text-center"
                @submit.prevent="findGame"
              >
                  <v-row
                    class="white--text mx-auto"
                    justify="center"
                  >
                    <v-col
                      class="light-blue--text text-center mb-3"
                      cols="12"
                      tag="h1"
                    >
                      <br />
                      <span
                        :class="[
                          //sm以下ならの三項演算子
                          $vuetify.breakpoint.smAndDown
                            ? 'display-3'
                            : 'display-4',
                        ]"
                        class="font-weight-black"
                      >
                        KANSEN
                      </span>
                      <br />
                      <span
                        class="font-weight-light"
                        :class="[
                          $vuetify.breakpoint.smAndDown
                            ? 'display-1'
                            : 'display-2',
                        ]"
                      >
                        スポーツ観戦を楽しもう！スポーツ検索サイト
                      </span>
                    </v-col>
                    <v-col
                      class="light-blue--text text-center mt-3"
                      cols="3"
                      tag="h1"
                    >
                      <v-select
                        class="light-blue--text text-center"
                        :items="sports"
                        label="スポーツで探す"
                        v-model="parameters.sports"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col
                      class="light-blue--text text-center mt-3"
                      cols="3"
                      tag="h1"
                    >
                      <v-select
                        :items="stadium"
                        label="スタジアムで探す"
                        v-model="parameters.stadium"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col
                      class="light-blue--text text-center mt-3"
                      cols="3"
                      tag="h1"
                    >
                      <v-select
                        :items="level"
                        label="レベルで探す"
                        v-model="parameters.level"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col
                      class="light-blue--text text-center mt-3"
                      cols="3"
                      tag="h1"
                    >
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="picker"
                            label="日程で探す"
                            readonly
                            outlined
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="picker"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-btn
                      btn
                    
                      color="primary"
                      dark
                      w-25
                      my-4
                      type="submit"
                      @click="$vuetify.goTo('#games')"
                    >
                      Find Games!
                    </v-btn>
                    <!-- <v-btn
                    class="align-self-end"
                    fab
                    outlined
                    @click="$vuetify.goTo('#games')"
                  >
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn> -->
                  </v-row>
              </v-form>
                </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>

      <section id="games" class="grey lighten-4">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">GAMES</h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
          </v-responsive>
          <v-row>
            <v-col
              cols="12"
              md="4"
              v-for="game in games"
              v-bind:key="game.id"
            >
              <v-card class="py-12 px-4" color="grey lighten-5" flat>
                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                >
                  {{ game.homeTeamId }} VS {{ game.awayTeamId }}
                </v-card-title>
                <v-card-text class="subtitle-1">
                  {{ game.gameDate }} at {{ game.stadiumName }}
                </v-card-text>

                <router-link
                  v-bind:to="{ name: 'gameDetail', params: { id: game.id } }"
                >
                  <v-btn color="warning" dark>
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
      <section id="reviews" class="grey lighten-4">
        <div class="py-12"></div>
        <v-container class="text-center" >

          <allReviews />

          <div></div>
        </v-container>

        <div class="py-12"></div>
      </section>
    </v-content>

    <v-footer class="justify-center light-blue accent-3"  height="100">
      <div
        class="title font-weight-light white--text text--lighten-1 text-center"
      >
KANSEN!
      </div>
    </v-footer>
  </v-app>
</template>
<script>
// import swal from "sweetalert";
import allReviews from "@/components/AllReviews";

export default {
  components: {
    allReviews,
  },
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      landscape: true,
      reactive: true,
      parameters: {
        sports: "",
        level: "",
        stadium: "",
        league: "",
        // picker:""
      },
      menu: false,
      games: [],
      sports: ["", "soccer", "baseball", "basketball", "rugby"],
      level: ["", "professional", "amature", "semi-pro"],
      stadium: ["", "AJINOMOTO STADIUM"],
    };
  },
  methods: {
    async findGame() {
      let response = await this.$http.get("api/auth/findGame", {
        params: {
          sportsName: this.parameters.sports,
          level: this.parameters.level,
          league: this.parameters.league,
          stadium: this.parameters.stadium,
          date: this.picker,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      });

      this.games = response.data.game;
      console.log(this.$store.state.auth);
    },
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
  },
};
</script>
