<template>
  <div class="grey lighten-4">
    <v-container>
      <v-card class="white lighten-4 p-5" tile>
        <v-row
          justify="start"
          align-content="center"
          class=" ma-3 pa-3"
          style="height: 300px;"
          align="center"
        >
          <v-col cols="2">
            <v-avatar
            class="profile"
            color="grey"
            size="100"
            >
            <v-img
              class="blue--text align-end"
              height="100px"
              width="100px"
              :src="user.image"
            >
            </v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10">
            <div
              :class="[
                //sm以下ならの三項演算子
                $vuetify.breakpoint.smAndDown ? 'headline' : 'display-1',
              ]"
            >
              <strong>{{ user.username }}</strong>
            </div>
          </v-col>

          <v-col cols="12">
            <div class="display-0">
              <strong>プロフィール:</strong> {{ user.profile }}
            </div>
          </v-col>
          <v-col cols="12">
            <div
              class="display-0"
              v-for="team in favoriteTeam"
              v-bind:key="team.id"
            >
              <strong>登録済みチーム:</strong> {{ team.teamName }}
            </div>
          </v-col>
          <v-col cols="12">
            <div class="display-0">
              <strong>好きなスポーツ:</strong> {{ user.favoriteSport }}
            </div>
          </v-col>
          <v-col cols="12">
            <div class="display-0">
              <strong>好きなスタジアム:</strong> {{ user.favoriteStadium }}
            </div>
          </v-col>

          <v-btn
            v-bind:to="{ name: 'myCalendar', params: { id: currentUser.id } }"
            v-bind="size"
            color="light-blue accent-3 white--text"
            class="mt-2 mr-1"
            >カレンダー
          </v-btn>

          <v-btn
            v-bind="size"
            class="mr-1 mt-2"
            color="primary"
            v-bind:to="{ name: 'profile', params: { id: currentUser.id } }"
          >
            プロフィール編集
          </v-btn>
        </v-row>
      </v-card>
    </v-container>
    <myReviews />
  </div>
</template>

<script>
// import axios from "axios";
import myReviews from "@/components/MyReviews";

export default {
  data() {
    return {
      user: {},
      reviews: [],
      favoriteTeam: [this.$store.state.myteam.teams],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    size() {
      const size = { xs: "x-small", sm: "small", lg: "small", xl: "small" }[
        this.$vuetify.breakpoint.name
      ];
      return size ? { [size]: true } : {};
    },
  },
  components: {
    myReviews,
  },
  async mounted() {
    let response = await this.$http.get(
      "api/auth/showMyReview",
      // .get("http://localhost:8080/api/auth/showMyReview",
      {
        params: {
          id: this.currentUser.id,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );

    this.reviews = response.data.review;
    // console.log(this.reviews)

    if (!this.currentUser) {
      this.$router.push("/");
    }
    const user = this.currentUser;
    this.$store.dispatch("myteam/addTeam", user);

    let res = await this.$http.get(
      "api/auth/user",
      // .get("http://localhost:8080/api/auth/user",
      {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );
    this.user = res.data.user;
  },
};
</script>
