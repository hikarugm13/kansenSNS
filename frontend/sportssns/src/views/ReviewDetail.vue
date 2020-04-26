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

    <div>
    <input
            label="File input"
            filled
            show-size
            style="display: none"
            type="file"
            ref="input"
            accept="image/png, image/jpeg, image/bmp"
            name="file"
            prepend-icon="mdi-camera"
            @change="onFileChange"
        />
    <v-img
      class="blue--text align-end"
      height="200px"
      v-if="review.image"
      :src="require('../../public/'+ review.image)"
    >  </v-img>
    <v-img
         height="125"
         width="125"
        v-if="url"
        :src="url"
        ></v-img>
        <v-btn color="primary" v-if="editable" @click="btnclick">画像を変更する</v-btn>
        </div>
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
      url:null,
      imageFile: null,
      review: {},
      editable:false
    };
  },computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods:{
    btnclick() {
      this.$refs.input.click();
    },
    onFileChange(e) {
      console.log(e);
      this.imageFile = e.target.files[0];
      console.log(this.imageFile)
      this.url = URL.createObjectURL(this.imageFile);
      console.log(this.url)
    },
    
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
      if (this.imageFile != null) {
        try {
          const formData = new FormData();
          formData.append("file", this.imageFile);
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              // "token": localStorage.getItem("jwt")
            },
          };
          //imageを保存してパスを返す
          let res = await this.$http.post(
            "api/auth/postImage",
            formData,
            config
          );
          this.review.image = res.data.path;
          if (res.data.status === "error") {
            alert(res.data.error);
          } else {
    try{
          let response = await this.$http.post("api/auth/updateReview",this.review,{headers: {
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
      }alert("登録完了");
          }
        } catch (error) {
          alert("画像の送信に失敗しました");
        }
      } else {
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
      }alert("登録完了");
          }
        }
  },
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
