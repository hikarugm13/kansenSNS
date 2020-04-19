<template>
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
    </p>

    <!-- <strong>Authorities:</strong>
    <div class="card col-lg-6 offset-lg-3 col-sm-10 offset-sm-1"  v-for="review in reviews" v-bind:key="review.gameId">
  <img class="card-img-top" src="" alt="REVIEW">
  <div class="card-body">
    <h5 class="card-title">{{review.review}}</h5>
    <p class="card-text">{{review.userName}} </p>
    <router-link v-bind:to="{ name: 'reviewDetail', params: { id: review.id } }" class="btn btn-primary" >詳細</router-link>
  </div> -->
    <!-- </div> -->
</div>
</template>

<script>
import axios from 'axios';
import swal from "sweetalert";

export default {

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
  mounted() {
axios.get('http://localhost:8080/api/auth/getTeamInfo',
        {
          params:{
            teamName:this.teamName },
          headers: {
            token: localStorage.getItem("jwt")
          }
        }
        
      ).then(response=>{
      this.team = response.data.team;
      console.log(this.team)
       })
  },
  methods: {
    async  registerMyTeam() {
      try {
        let response = await this.$http.post("api/auth/registerTeam", {userId:this.currentUser.id,
      teamId:this.team.id,teamName:this.team.teamName});
        console.log(response);
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