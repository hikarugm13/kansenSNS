<template>
    <v-card
  class="white lighten-4 p-5"
          shaped
  > 
            <h2 class="display-2 font-weight-bold mb-3">新着観戦記</h2>

 <v-responsive
            class="mx-auto mb-8"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>
            <v-divider></v-divider>
          </v-responsive>

  <v-row>
   <v-col
      v-for="review in reviews"
      v-bind:key="review.id"
          cols=4
    >
    <v-card
    class="mx-auto"
        hover

    tile
  >
    <v-img
      class="blue--text align-end"
      height="200px"
      v-if="review.image"
      :src="require('../../public/'+ review.image)"
    >
    </v-img>

      <v-card-subtitle class="pb-0">{{review.game.homeTeamId}} VS {{review.game.awayTeamId}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ review.review }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
                    
                      color="primary"
                      dark
                      w-25
                      my-4
        :to="{ name: 'reviewDetail', params: { id: review.id } }"
      >
        詳細
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-col>
  </v-row>
    </v-card>
    

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
    let response = await this.$http.get("api/auth/getAllReview",
      // .get("http://localhost:8080/api/auth/getAllReview", 
      {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
        this.reviews = response.data.review;
        console.log(this.reviews);
  },
};
</script>