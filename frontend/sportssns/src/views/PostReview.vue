<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <h1>POST POST REVIEW</h1>
        <h2 class="card-title">
          {{ game.homeTeamId }} VS {{ game.awayTeamId }}
        </h2>
        <p class="card-text">{{ game.gameDate }} at {{ game.stadiumId }}</p>

        <form @submit.prevent="submitClick">
          <v-container fluid>
            <v-textarea
              name="input-7-1"
              filled
              label="Review"
              auto-grow
              value=""
              v-model="review.review"
            ></v-textarea>
          </v-container>
          <v-file-input
            label="File input"
            filled
            show-size
            accept="image/png, image/jpeg, image/bmp"
            name="file"
            prepend-icon="mdi-camera"
            @change="onFileChange"
          />
           <v-img
         height="125"
         width="125"
        v-if="url"
        :src="url"
        ></v-img>
          <!-- <textarea rows="10" cols="60" v-model="review.review" placeholder="Write your REVIEW!!"></textarea> -->
          <!-- <input type="image" v-model="review.image"> -->
          <v-btn class="mr-4" @click="submitClick">submit</v-btn>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import reviews from "../components/GameReviews";
import axios from "axios";
import swal from "sweetalert";

export default {
  props: ["id"],
  components: {
    // reviews,
  },
  data() {
    return {
      url:null,
      imageFile: null,
      game: {},
      review: {
        gameId: this.id,
        userId: this.$store.state.auth.user.id,
        userName: this.$store.state.auth.user.username,
        review: "",
        image: "",
      },
    };
  },
  methods: {
    onFileChange(e) {
      console.log(e);
      this.imageFile = e;
      this.url = URL.createObjectURL(this.imageFile);
    },
    async submitClick() {
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
            //パスと合わせてレビューを投稿
            try {
              let response = await this.$http.post(
                "api/auth/postReview",
                this.review,
                {
                  headers: {
                    token: localStorage.getItem("jwt"),
                  },
                }
              );
              console.log(response);
              console.log(this.review);
              this.$router.push({
                name: "gameDetail",
                params: { id: this.review.gameId },
              });
            } catch (err) {
              let error = err.response;
              if (error.status == 400) {
                swal("Error", error.data.message, "error");
              } else {
                swal("Error", error.data.err.message, "error");
              }
            }
            alert("登録完了");
          }
        } catch (error) {
          alert("画像の送信に失敗しました");
        }
      } else {
        try {
          let response = await this.$http.post(
            "api/auth/postReview",
            this.review,
            {
              headers: {
                token: localStorage.getItem("jwt"),
              },
            }
          );
          console.log(response);
          console.log(this.review);
          this.$router.push({
            name: "gameDetail",
            params: { id: this.review.gameId },
          });
        } catch (err) {
          let error = err.response;
          if (error.status == 400) {
            swal("Error", error.data.message, "error");
          } else {
            swal("Error", error.data.err.message, "error");
          }
        }
        alert("登録完了");
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/auth/findGameDetail", {
        params: {
          id: this.id,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        this.game = response.data.game;
        console.log(this.game);
      });
  },
};
</script>
