<template>
  <div>
    <h1>REVIEW</h1>
    <h2 class="card-title">{{game.homeTeamId}} VS {{game.awayTeamId}}</h2>
    <p class="card-text">{{game.gameDate}} at {{game.stadiumId}}</p>
      <label>Review</label>
    <form @submit.prevent="postReview">
      <textarea rows="10" cols="60" v-model="review.review" placeholder="Write your REVIEW!!"></textarea>
      <input type="image" v-model="review.image">
    </form>
      <reviews />
  </div>

</template>

<script>
import reviews from "../components/GameReviews";
import axios from 'axios';
import swal from "sweetalert";

export default {
  props: ["id"],
  components:{
    reviews
  },
  data() {
    return {
      game: {},
      review:{
        gameId:this.id,
        userName:"aaa",
        review:"",
        image:""
      }
    };
  },
  methods:{
    async postReview(){
      try{
          let response = await this.$http.post("api/auth/postReview",this.review,{headers: {
            token: localStorage.getItem("jwt")
          }})
        console.log(response);
        console.log(this.review);

    }catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
  }
  }
  ,
  mounted(){
     axios.get('http://localhost:8080/api/auth/findGameDetail',
        {
          params:{
            id: this.id
          },
          headers: {
            token: localStorage.getItem("jwt")
          }
        })
        .then(response=>{
        this.game = response.data.game
        console.log(this.game)
         })
  }
}
</script>