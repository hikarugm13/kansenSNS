<template>
  <v-container class="text-center">
    <v-card class="white lighten-4 p-5" shaped>
      <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'title'
                          : 'headline',
                      ]" class="font-weight-black pb-3">
        My観戦記
      </div>
      <v-row>
        <v-col
          v-for="review in reviews"
          v-bind:key="review.id"
          cols="12"
          sm="12"
          md="6"
          lg="4"
          justify="center"
          align="center"
        >
          <v-card class="mx-auto" hover>
            <v-img
              class="blue--text align-end"
              height="200px"
              v-if="review.image"
              :src="review.image"
            >
              <!-- <v-card-title>{{ review.userName }}</v-card-title> -->
            </v-img>

            <v-card-subtitle class="pb-0"
              >{{ review.game.homeTeamId }} VS
              {{ review.game.awayTeamId }}</v-card-subtitle
            >

            <v-card-text class="text--primary">
              <div>{{ review.review | truncate }}</div>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn
                dark
                color="grey darken-3 text--white"
                v-bind:to="{ name: 'reviewDetail', params: { id: review.id } }"
              >
                詳細
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
// import axios from 'axios';
export default {
  data() {
    return {
      reviews: [],
    };
  },
  filters: {
    truncate: function(value) {
      var length = 20;
      var ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  components: {},
  async mounted() {
    let response = await this.$http.get(
      "api/auth/showMyReview",
      // axios.get('http://localhost:8080/api/auth/showMyReview',
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
      this.$router.push("/login");
    }
    const user = this.currentUser;
    this.$store.dispatch("myteam/addTeam", user);
  },
};
</script>
