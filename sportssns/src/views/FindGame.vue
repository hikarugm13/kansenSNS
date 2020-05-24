<template>
  <v-app>
    <div class="d-none d-sm-flex">
    <v-toolbar dense color="grey lighten-3" height="70px">
      <v-container class=" mt-8">
        <v-form class="text-center" @submit.prevent="findGame">
          <v-row class="white--text" justify="start" align="top">
            <v-col cols="4" lg="4" xs="5" class="white--text text-center my-1"  tag="h3">
              <!-- <label>スポーツで探す</label> -->
              <v-select
                class="light-blue--text text-center"
                :items="sports"
                v-model="parameters.sports"
                background-color="grey lighten-5"
                filled
                label="スポーツ"
              ></v-select>
            </v-col>
            <!-- <v-col class="white--text text-center my-1" cols="3" tag="h3">
              <label>スタジアムで探す</label>
              <v-select
                :items="stadium"
                label="スタジアムで探す"
                v-model="parameters.stadium"
                background-color="grey lighten-5"
                filled
              ></v-select>
            </v-col> -->
            <!-- <v-col class="white--text text-center my-1" cols="3" tag="h3">
              <label>カテゴリーで探す</label>
              <v-select
                :items="level"
                label="カテゴリーで探す"
                background-color="grey lighten-5"
                v-model="parameters.level"
                filled
              ></v-select>
            </v-col> -->
            <v-col cols="4" lg="4" xs="5"  class="white--text text-center my-1" tag="h3">
              <!-- <label>日程で探す</label> -->
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                lavel="日程"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="picker"
                    label="日程で探す"
                    readonly
                    filled
                    background-color="grey lighten-5"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="picker"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="white--text text-center my-4 mr-" cols="4" tag="h3">
              <v-btn
                btn
                color="grey darken-3"
                dark
                w-25
                my-4
                type="submit"
                @click="$vuetify.goTo('#games')"
              >
                試合検索
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-toolbar></div>

    <section id="top">
      <v-row no-gutters>
        <v-img :height="'calc(22vh)'" src="../../public/uploads/41066.jpg">
          <v-container fill-height>
            <v-col class="white--text text-center mb" cols="12" tag="h2">
              <span
                :class="[
                  //sm以下ならの三項演算子
                  $vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4',
                ]"
                class="font-weight-black"
              >
                Tailgate
              </span>
              <br />
              <span
                class="font-weight-light "
                :class="[$vuetify.breakpoint.smAndDown ? 'title' : 'title']"
              >
                スポーツの感動を仲間と
              </span>
            </v-col>
          </v-container>
        </v-img>
      </v-row>
    </section>

    <section id="newGames" class="grey lighten-4">
      <v-container class="text-center">
        <newGames />
        <router-link :to="{ name: 'allNewGames' }">
          <v-btn color="yellow lighten-1">もっと見る</v-btn></router-link
        >
      </v-container>
    </section>

    <section id="games" class="">
      <!-- <div class="py-12"></div> -->
      <v-container class="text-center" :height="'calc(100vh)'">
        <v-responsive class="mx-auto mb-3" width="56"> </v-responsive>
        <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'title'
                          : 'headline',
                      ]" class="font-weight-black pb-3">検索結果</div>
        <v-responsive class="mx-auto mb-3" width="56">
          <v-divider class="mb-1"></v-divider>
          <!-- <v-divider></v-divider> -->
        </v-responsive>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
        </v-responsive>
        <v-row>
          <v-col cols="12" md="4" v-for="game in games" v-bind:key="game.id">
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

    <section class="grey lighten-4">
      <v-container class="text-center">
        <allReviews />
        <router-link :to="{ name: 'newReviews' }">
          <v-btn color="yellow lighten-1">もっと見る</v-btn></router-link
        >
        <div class="py-12"></div>
        <div></div>
      </v-container>
    </section>

    <v-footer class="justify-center grey darken-3" height="100">
      <div
        class="title font-weight-light white--text text--lighten-1 text-center font-italic"
      >
        Tailgate!
      </div>
    </v-footer>
  </v-app>
</template>
<script>
// import swal from "sweetalert";
import allReviews from "@/components/AllReviews";
import newGames from "@/components/NewGames";

export default {
  components: {
    allReviews,
    newGames,
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
      newGames: [],
      sports: ["", "サッカー", "野球", "バスケットボール", "ラグビー"],
      level: ["", "プロ", "社会人", "大学", "高校", "中学"],
      stadium: [
        "",
        "味の素スタジアム",
        "東京ドーム",
        "アリーナ立川立飛",
        "秩父宮ラグビー場",
      ],
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
      // console.log(this.$store.state.auth);
    },
  },
};
</script>
