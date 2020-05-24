<template
  >
  <!-- <v-app> -->
    <!-- <v-content class="grey lighten-4"> -->
  <div class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card class="white lighten-4 p-5" tile>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">
                    <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'display-0'
                          : 'display-2',
                      ]">{{ stadium.stadiumName }}</div>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                   <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'display-0'
                          : 'display-1',
                      ]">所在地：{{stadium.stadiumAddress}}</div> 
                     </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'display-0'
                          : 'display-1',
                      ]">収容人数：{{stadium.capacity}}人</div>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'display-0'
                          : 'display-1',
                      ]">屋根：{{stadium.roofInfo}}</div>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <div :class="[
                        //sm以下ならの三項演算子
                        $vuetify.breakpoint.smAndDown
                          ? 'display-0'
                          : 'display-1',
                      ]">座席：{{stadium.seatInfo}}</div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <stadiumReview :stadiumId="stadium.id" />
  </div>
    <!-- </v-content> -->
  <!-- </v-app> -->
</template>

<script>
// import axios from "axios";
// import swal from "sweetalert";
import stadiumReview from "@/components/StadiumReview";

export default {
  components: {
    stadiumReview,
  },
  props: ["stadiumId"],
  data() {
    return {
      stadium: {},
      favoriteTeam: {},
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
async  mounted() {
let response = await this.$http.get("api/auth/findStadiumDetail",
      // .get("http://localhost:8080/api/auth/findStadiumDetail", {
        {
        params: {
          stadiumId: this.stadiumId,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })

        this.stadium = response.data.stadium;

  },
  methods: {},
};
</script>
