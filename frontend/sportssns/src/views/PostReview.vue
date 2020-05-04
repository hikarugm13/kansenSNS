<template>
  <v-container>
    <v-card
      class="white lighten-4 p-5 m-5 text-center"
      tile
      hover
    >
    <v-row>
      <v-col cols="12">
        <h1>レビューを投稿する</h1>
        <h2 class="card-title">
          {{ game.homeTeamId }} VS {{ game.awayTeamId }}
        </h2>
        <p class="card-text">{{ game.gameDate }} at {{ game.stadiumId }}</p>

        <form @submit.prevent="submitClick">
          <v-container fluid>
            <v-textarea
              name="input-7-1"
              outlined
              label="Review"
              auto-grow
              value=""
              v-model="review.review"
            ></v-textarea>
          </v-container>
          <v-file-input
            label="File input"
            dense
            outlined
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
<backButton />
        </form>
      </v-col>
    </v-row>
    </v-card>
  </v-container>
</template>

<script>
// import reviews from "../components/GameReviews";
import axios from "axios";
import swal from "sweetalert";
import backButton from "@/components/backButton";


export default {
  props: ["id"],
  components: {
        backButton
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
