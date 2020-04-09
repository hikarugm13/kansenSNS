<template>
  <div>
     <div class="card col-lg-6 offset-lg-3 col-sm-10 offset-sm-1"  v-for="review in reviews" v-bind:key="review.gameId">
  <img class="card-img-top" src="" alt="REVIEW">
  <div class="card-body">
    <h5 class="card-title">{{review.review}}</h5>
    <p class="card-text">{{review.userName}} </p>
    <router-link v-bind:to="{ name : 'gameDetail', params : { id: 2 }}" class="btn btn-primary" >詳細</router-link>
  <!-- <router-link v-bind:to="{ name : 'gameDetail', params : { id: game.id }}"></router-link> -->
  </div>
</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    

    data() {
      return{
  reviews:[],
    props: ["id"],
}},
  mounted(){
    console.log(this.$route.params['id'])
      axios.get('http://localhost:8080/api/auth/showReview',
        {
          params:{
            id: this.$route.params['id'] },
          headers: {
            token: localStorage.getItem("jwt")
          }
        
        }
        
      ).then(response=>{
      this.reviews = response.data.review;
      console.log(this.reviews[0])
       })
    }
  
}
</script>