<template>
  <div>
     <div class="card col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
  <img class="card-img-top" src="" alt="REVIEW">
  <div class="card-body">
    <h5 class="card-title">{{review.userName}}</h5>
    <p v-if="!editable" class="card-text">{{review.review}} </p>
    <v-textarea
     v-if="editable"
      name="input-7-1"
      filled
      label="Review"
      auto-grow
      value=""
      v-model="review.review"
    ></v-textarea>
<v-btn v-if="!editable && currentUser"  small color="error" @click="deleteReview">DELETE</v-btn>
<v-btn v-if="!editable && currentUser"  small color="primary" @click="edit">EDIT</v-btn>
<v-btn v-if="editable" class="mr-4" @click="editReview">submit</v-btn>
  <!-- <router-link v-bind:to="{ name : 'gameDetail', params : { id: game.id }}"></router-link> -->
  </div>
</div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  props: ["id"],
  data() {
    return {
      review: {},
      editable:false
    };
  },computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods:{
    async deleteReview(){
    try{
          let response = await this.$http.post("api/auth/deleteReview",this.review,{headers: {
            token: localStorage.getItem("jwt")
          }})
        console.log(response);
        console.log(this.review);
      this.$router.push({ name: 'gameDetail', params: { id: this.review.gameId } });

    }catch (err) {
        let error = err.response;
        if (error.status == 400) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
  },
    edit(){
        this.editable=true
    },
    async editReview(){
    try{
          let response = await this.$http.post("api/auth/updateReview",this.review,{headers: {
            token: localStorage.getItem("jwt")
          }})
        console.log(response);
        console.log(this.review);
      this.$router.push({ name: 'reviewDetail', params: { id: this.review.gameId } });

    }catch (err) {
        let error = err.response;
        if (error.status == 400) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
  }
  }
  ,
  mounted() {
    axios
      .get("http://localhost:8080/api/auth/showReviewDetail", {
        params: {
          id: this.id,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        this.review = response.data.review;
        console.log(this.review);
      });
  },
};
</script>
