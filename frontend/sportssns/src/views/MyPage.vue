<template>
  <div class="grey lighten-4">
    <v-container>
      <v-row
         justify="start" align-content="center"
        class="white ma-3 pa-3"
        style="height: 300px;"
        
      >
        <v-col cols="3">
           <v-img
      class="blue--text align-end"
      height="100px"
      :src="require('../../public/'+ user.image)"
    ></v-img>
    </v-col>
        <v-col cols="3" >
          <h3>
            <strong>{{ user.username }}</strong>
          </h3>
        </v-col>
        
        <v-col cols="12">
          <h5 v-for="team in favoriteTeam" v-bind:key="team.teamId">
            My Team:{{ team.teamName }}
          </h5>
        </v-col>
        <v-col cols="12">
          <h5>
            Profile:{{ user.profile}}
          </h5>
        </v-col>
        <v-col cols="2">
          <v-btn
            v-bind:to="{ name: 'myCalendar', params: { id: currentUser.id } }"
            color="light-blue accent-3 white--text"
            >My Calendar
          </v-btn>
        </v-col>
        <v-col cols="2">
                <v-btn
        color="primary"
        v-bind:to="{ name: 'profile', params: { id: currentUser.id } }"
      >
        プロフィール編集
      </v-btn>
        </v-col>
      </v-row>
      <myReviews />
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import myReviews from "@/components/MyReviews";

export default {
  data() {
    return {
      user:{

      },
      reviews: [],
      favoriteTeam: [this.$store.state.myteam.teams],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  components: {
    myReviews,
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/auth/showMyReview", {
        params: {
          id: this.currentUser.id,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        this.reviews = response.data.review;
        // console.log(this.reviews)
      });
    if (!this.currentUser) {
      this.$router.push("/findGame");
    }
    const user = this.currentUser;
    this.$store.dispatch("myteam/addTeam", user);

    axios
      .get("http://localhost:8080/api/auth/user", {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        this.user = res.data.user;
      });
  },
  
};
</script>
