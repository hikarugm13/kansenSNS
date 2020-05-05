<template><v-app>
  <v-content class="grey lighten-4">
    <v-container >
      <v-row>
        <v-col cols="12">
          <v-card
          class="white lighten-4 p-5"
            tile
          >
   <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
 <h1 >{{ team.teamName }}</h1>
        </v-list-item-title>
        <v-list-item-subtitle>
          </v-list-item-subtitle>
              <v-list-item-subtitle>
        <v-btn small color="error" @click="registerMyTeam">MyTeamに登録</v-btn>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
        <teamReviews :id="team.id" />
  </v-content>
</v-app>

<!-- 
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{team.teamName}}</strong></h3>
         <v-btn small color="error" @click="registerMyTeam">MyTeamに登録</v-btn>
    </header>
    <p>
      <strong>Team:</strong>
{{team.teamName}}
    </p>
    <p>
      <strong>Id:</strong>
      {{team.id}}
    </p> -->

<!-- 
</div> -->
</template>

<script>
// import axios from 'axios';
import swal from "sweetalert";
import teamReviews from "@/components/TeamReviews";

export default {
 components: {
    teamReviews,
  },
  props: ["teamName"],
  data(){
  return{
    team:{},
    favoriteTeam:{
      
    }
  }
  }
  ,
      computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  async mounted() {
    let response = await this.$http.get("api/auth/getTeamInfo",
// axios.get('http://localhost:8080/api/auth/getTeamInfo',
        {
          params:{
            teamName:this.teamName },
          headers: {
            token: localStorage.getItem("jwt")
          }
        }
        
      )
      this.team = response.data.team;
      // console.log(this.team)
  },
  methods: {
    async  registerMyTeam() {
      try {
      await this.$http.post("api/auth/registerTeam", {userId:this.currentUser.id,
      teamId:this.team.id,teamName:this.team.teamName});
        // console.log(response);
      } catch (err) {
        let error = err.response;
        if (error.status == 400) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    }
  },
};
</script>