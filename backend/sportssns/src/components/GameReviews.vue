<template>
  <v-container class="">
    <v-card shaped class="white lighten-4 p-5">
      <h2 class="font-weight-black pb-3">この試合の観戦記</h2>
      <v-row>
        <v-col v-for="review in reviews" v-bind:key="review.id" cols="4" justify="center" 
        align="center">
          <v-card class="mx-auto">
            <v-img
              class="blue--text align-end"
              height="200px"
              v-if="review.image"
              :src="require('../../public/' + review.image)"
            >
              <!-- <v-card-title>{{ review.userName }}</v-card-title> -->
            </v-img>

            <v-card-subtitle class="pb-0">{{
              review.userName
            }}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ review.review }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
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
// import axios from "axios";

export default {
  data() {
    return {
      reviews: [],
      props: ["id"],
    };
  },
  async mounted() {
    console.log(this.$route.params["id"]);
    let response = await this.$http.get("api/auth/getGameReview",
      // .get("http://localhost:8080/api/auth/getGameReview", 
      {
        params: {
          id: this.$route.params["id"],
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
     
        this.reviews = response.data.review;
        console.log(this.reviews);

  },
};
</script>
