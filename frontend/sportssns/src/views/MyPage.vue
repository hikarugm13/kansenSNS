<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    <router-link v-bind:to="{ name: 'myCalendar', params: { id: currentUser.id } }" class="btn btn-primary" >My Calendar</router-link>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p v-for="team in favoriteTeam" v-bind:key="team.teamId" > My Team:{{team.teamName}}</p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <div class="card col-lg-6 offset-lg-3 col-sm-10 offset-sm-1"  v-for="review in reviews" v-bind:key="review.gameId">
  <img class="card-img-top" src="" alt="REVIEW">
  <div class="card-body">
    <h5 class="card-title">{{review.review}}</h5>
    <p class="card-text">{{review.userName}} </p>
    <router-link v-bind:to="{ name: 'reviewDetail', params: { id: review.id } }" class="btn btn-primary" >詳細</router-link>
  </div>
    </div>
  <!-- <myCalendar v-for="team in favoriteTeam" v-bind:key="team.teamId" :myteams="team"/> -->
</div>
</template> 

<script>
import axios from 'axios';
// import myCalendar from "@/views/MyCalendar";

export default {
  data(){
  return{
    reviews:[],
    favoriteTeam:[this.$store.state.myteam.teams]
  }
  }
  ,
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
    components: {
    // myCalendar
  },
  mounted() {
axios.get('http://localhost:8080/api/auth/showMyReview',
        {
          params:{
            id: this.currentUser.id },
          headers: {
            token: localStorage.getItem("jwt")
          }
        
        }
        
      ).then(response=>{
      this.reviews = response.data.review;
      // console.log(this.reviews)  
       })
    if (!this.currentUser) {
      this.$router.push('/login');
    }
      const user = this.currentUser
      this.$store.dispatch("myteam/addTeam",user)
          


// axios.get('http://localhost:8080/api/auth/findFavoriteTeam',
//         {
//           params:{
//             userId:this.currentUser.id },
//           headers: {
//             token: localStorage.getItem("jwt")
//           }
//         }
        
//       ).then(response=>{
//       this.favoriteTeam = response.data.favoriteTeam;
//       console.log(this.favoriteTeam)
//        })
 
  },
};
</script>