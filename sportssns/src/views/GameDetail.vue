<template>
  <v-app>
    <!-- <v-content class="grey lighten-4"> -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="white lighten-4 p-5" dark tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  <router-link
                    v-bind:to="{
                      name: 'teamInfo',
                      params: { teamName: game.homeTeamId },
                    }"
                    class="black--text"
                    ><div
                      :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'display-0'
                          : 'display-2',
                      ]"
                    >
                      {{ game.homeTeamId }}
                    </div></router-link
                  >
                  <div
                    :class="[
                      //sm以下ならの三項演算子
                      $vuetify.breakpoint.smAndDown ? 'display-0' : 'display-1',
                    ]"
                    class="red--text"
                  >
                    VS
                  </div>
                  <router-link
                    v-bind:to="{
                      name: 'teamInfo',
                      params: { teamName: game.awayTeamId },
                    }"
                    class="black--text"
                    ><div
                      :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'display-0'
                          : 'display-2',
                      ]"
                    >
                      {{ game.awayTeamId }}
                    </div>
                  </router-link>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div
                    :class="[
                      //sm以下ならの三項演算子
                      $vuetify.breakpoint.smAndDown ? 'display-0' : 'display-1',
                    ]"
                    class="card-text grey--text"
                  >
                    開始時間：
                    <span class="black--text">
                      {{ game.startTime }}
                    </span>
                  </div></v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  <div
                    :class="[
                      //sm以下ならの三項演算子
                      $vuetify.breakpoint.smAndDown ? 'display-0' : 'display-1',
                    ]"
                    class="card-text grey--text"
                  >
                    開催場所：
                    <router-link
                      v-bind:to="{
                        name: 'stadiumDetail',
                        params: { stadiumId: game.stadiumId },
                      }"
                      class="black--text"
                      >{{ game.stadiumName }}</router-link
                    >
                  </div></v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  <div
                    :class="[
                      //sm以下ならの三項演算子
                      $vuetify.breakpoint.smAndDown ? 'display-0' : 'display-1',
                    ]"
                    class="card-text grey--text"
                  >
                    放送予定：<span class="black--text">
                      {{ game.broadcaster }}
                    </span>
                  </div></v-list-item-subtitle
                >
                <br>
                <v-list-item-subtitle>
                  <v-btn
                    v-bind:to="{
                      name: 'postReview',
                      params: { id: game.id },
                    }"
                    v-bind="size"
                    color="success"
                    class="mr-1 mt-2"
                    v-if="currentUser"
                    >レビューを書く
                  </v-btn>
                  <v-btn
                  v-bind="size"
                    v-bind:to="{
                      name: 'gameChat',
                      params: { gameId: game.id },
                    }"
                    color="indigo"
                    class="mr-1 mt-2"
                    v-if="currentUser"
                    >チャットする
                  </v-btn>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <gameReviews :id="game.id" />
    <!-- </v-content> -->
  </v-app>
</template>

<script>
// import axios from "axios";
import gameReviews from "@/components/GameReviews";
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    size () {
      const size = {xs:'x-small',sm:'small',lg:'large',xl:'large'}[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {}
    }
  },
  components: {
    gameReviews,
  },
  props: ["id"],
  data() {
    return {
      game: {},
    };
  },
  async mounted() {
    console.log(this.id);
    let response = await this.$http.get(
      "api/auth/findGameDetail",
      // .get("http://localhost:8080/api/auth/findGameDetail",
      {
        params: {
          id: this.id,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );

    this.game = response.data.game;
    console.log(this.game);
  },
};
</script>
<style></style>
