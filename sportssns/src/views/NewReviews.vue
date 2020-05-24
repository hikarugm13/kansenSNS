<template>
  <v-container class="text-center">
    <v-responsive class="mx-auto mb-3" width="56"> </v-responsive>
    <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'title'
                          : 'headline',
                      ]" class="font-weight-black pb-3">新着レビュー</div>
    <v-responsive class="mx-auto mb-3" width="56">
      <v-divider class="mb-1"></v-divider>
      <!-- <v-divider></v-divider> -->
    </v-responsive>

    <v-row>
      <v-col
        v-for="review in reviews"
        v-bind:key="review.id"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <v-card class="mx-auto" hover tile>
          <v-img
            class="blue--text align-end"
            height="200px"
            v-if="review.image"
            :src="review.image"
          >
          </v-img>

          <v-card-subtitle class="pb-0"
            >{{ review.game.homeTeamId }}<br />
            VS<br />
            {{ review.game.awayTeamId }}<br />
            {{ review.game.gameDate }}
          </v-card-subtitle>

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
    <div></div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      reviews: [],
      props: ["id"],
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
  async mounted() {
    let response = await this.$http.get(
      "api/auth/getAllReview",
      // .get("http://localhost:8080/api/auth/getTenReview",
      {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );
    this.reviews = response.data.review;
    console.log(this.reviews);
  },
};
</script>
