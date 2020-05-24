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
            <v-img
              class="blue--text align-end"
              height="100px"
              width="100px"
              :src="supporter.image"
            >
            </v-img>
          </v-col>
          <v-col cols="3">
            <h3>
              <strong>{{ supporter.username }}</strong>
            </h3>
          </v-col>

          <v-col cols="12">
            <h5><strong>プロフィール:</strong> {{ supporter.profile }}</h5>
          </v-col>
          <v-col cols="12">
            <h5 v-for="team in favoriteTeam" v-bind:key="team.id">
              <strong>登録済みチーム:</strong> {{ team.teamName }}
            </h5>
          </v-col>
          <v-col cols="12">
            <h5>
              <strong>好きなスポーツ:</strong> {{ supporter.favoriteSport }}
            </h5>
          </v-col>
          <v-col cols="12">
            <h5>
              <strong>好きなスタジアム:</strong> {{ supporter.favoriteStadium }}
            </h5>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <supporterReviews :supporterId="supporter.id"/>
  </div>
</template>

<script>
// import axios from "axios";
import supporterReviews from "@/components/SupporterReviews";

export default {
  data() {
    return {
      supporter: {},
      reviews: [],
      supporterId: this.$route.params["supporterId"],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  components: {
    supporterReviews,
  },
  async mounted() {
    console.log(this.$route.params["supporterId"]);
    let res = await this.$http.get(
      "api/auth/findSupporterInfo",
      // .get("http://localhost:8080/api/auth/user", {
      {
        params: {
          id: this.supporterId,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );

    this.supporter = res.data.supporter;
    console.log(this.supporter);
  },
};
</script>
