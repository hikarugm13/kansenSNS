<template>
<v-container class="">
  <v-card
    shaped
  class="white lighten-4 p-5" > 
   <h2 class="font-weight-black pb-3" justify="center" 
        align="center">このチームの観戦記</h2>
  <v-row>
    <v-col
      v-for="review in reviews"
      v-bind:key="review.id"
          cols=4
    >
    <v-card
    class="mx-auto"
  >
    <v-img
      class="blue--text align-end"
      height="200px"
      v-if="review.image"
      :src="require('../../public/'+ review.image)"
    >
      <!-- <v-card-title>{{ review.userName }}</v-card-title> -->
    </v-img>

    <v-card-subtitle class="pb-0">{{ review.userName }}</v-card-subtitle>

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
 async  mounted() {
    // console.log(this.$attrs[id]);
    let response = await this.$http.get("api/auth/findTeamReview",
      // .get("http://localhost:8080/api/auth/findTeamReview", 
      {
        params: {
          id: this.$route.params["teamName"],
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
        console.log(response.data.game)
        for(let i =0;i<response.data.game.length;i++){
          for(let j =0;j<response.data.game[i].reviews.length;j++){
            this.reviews.push({
              gameId:response.data.game[i].reviews[j].gameId,
              userId:response.data.game[i].reviews[j].userId,
              userName:response.data.game[i].reviews[j].userName,
              review:response.data.game[i].reviews[j].review,
              image:response.data.game[i].reviews[j].image,
              createdAt:response.data.game[i].reviews[j].createdAt,
          })
          }
        }
        console.log(this.reviews);
  },
};
</script>
