<template
  ><v-app>
    <v-content class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card class="white lighten-4 p-5" tile>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">
                    <h1>{{ stadium.stadiumName }}</h1>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                   <h2>所在地：{{stadium.stadiumAddress}}</h2> 
                     </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <h2>収容人数：{{stadium.capacity}}人</h2>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <h2>屋根：{{stadium.roofInfo}}</h2>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <h2>座席：{{stadium.seatInfo}}</h2>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <stadiumReview :stadiumId="stadium.id" />
    </v-content>
  </v-app>
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
        // console.log(this.stadium);

  },
  methods: {},
};
</script>
