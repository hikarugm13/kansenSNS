<template>
  <v-container class="text-center">
    <v-card shaped class="white lighten-4 p-5">
      <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'title'
                          : 'headline',
                      ]" class="font-weight-black pb-3">この会場の観戦記</div>
      <v-row>
        <v-col
          v-for="review in reviews"
          v-bind:key="review.id"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <v-card class="mx-auto" justify="center" align="center">
            <v-img
              class="blue--text align-end"
              height="200px"
              v-if="review.image"
              :src="review.image"
            >
              <!-- <v-card-title>{{ review.userName }}</v-card-title> -->
            </v-img>

            <v-card-subtitle class="pb-0">{{
              review.gameDate
            }}</v-card-subtitle>
            <v-card-subtitle class="pb-0">{{
              review.userName
            }}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ review.review }}</div>
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
// import axios from "axios";

export default {
  data() {
    return {
      reviews: [],
      props: ["stadiumId"],
    };
  },
  async mounted() {
    console.log(this.$route.params["stadiumId"]);
    let response = await this.$http.get(
      "api/auth/findStadiumReview",
      // .get("http://localhost:8080/api/auth/findStadiumReview",
      {
        params: {
          id: this.$route.params["stadiumId"],
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response.data.stadium);
    for (let i = 0; i < response.data.stadium.length; i++) {
      for (let j = 0; j < response.data.stadium[i].reviews.length; j++) {
        this.reviews.push({
          id: response.data.stadium[i].reviews[j].id,
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
  },
};
</script>
