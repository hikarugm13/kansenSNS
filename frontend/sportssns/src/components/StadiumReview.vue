<template>
  <v-container class="">
    <v-card shaped class="white lighten-4 p-5">
      <h2 class="font-weight-black pb-3">この会場の観戦記</h2>
      <v-row>
        <v-col v-for="review in reviews" v-bind:key="review.id" cols="4">
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
import axios from "axios";

export default {
  data() {
    return {
      reviews: [],
      props: ["stadiumId"],
    };
  },
  mounted() {
    console.log(this.$route.params["stadiumId"]);
    axios
      .get("http://localhost:8080/api/auth/findStadiumReview", {
        params: {
          id: this.$route.params["stadiumId"],
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        console.log(response.data.stadium);
        for (let i = 0; i < response.data.stadium.length; i++) {
          for (let j = 0; j < response.data.stadium[i].reviews.length; j++) {
            this.reviews.push({
              stadiumId: response.data.stadium[i].reviews[j].stadiumId,
              userId: response.data.stadium[i].reviews[j].userId,
              userName: response.data.stadium[i].reviews[j].userName,
              review: response.data.stadium[i].reviews[j].review,
              image: response.data.stadium[i].reviews[j].image,
              createdAt: response.data.stadium[i].reviews[j].createdAt,
            });
          }
        }
        console.log(this.reviews);
      });
  },
};
</script>
