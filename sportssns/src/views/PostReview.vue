<template>
  <div class="grey lighten-4">
  <v-container >
    <v-card class="white lighten-4 text-center py-5 mt-5" tile hover>
      <v-row justify="center">
        <v-col cols="12">
          <!-- <div
            :class="[
              //sm以下ならの三項演算子
              $vuetify.breakpoint.smAndDown ? 'title' : 'headline',
            ]"
            class="font-weight-black pb-3"
          >
            レビューを投稿する
          </div> -->
          <div
            :class="[
              //sm以下ならの三項演算子
              $vuetify.breakpoint.smAndDown ? 'title' : 'display-1',
            ]"
            class="card-title"
          >
            {{ game.homeTeamId }} VS {{ game.awayTeamId }}
          </div>
          <p class="card-text">{{ game.gameDate }} at {{ game.stadiumName }}</p>
        </v-col>
        <v-col>
          <form @submit.prevent="submitClick">
            <!-- <v-col cols="12"> </v-col> -->
            <v-chip class="ma-2" label>
              観戦方法
            </v-chip>
                <v-container fluid>
            <v-row justify="center" class="px-2">
              <v-radio-group v-model="review.howToWatch" row>
                <v-radio
                  label="テレビ・オンライン"
                  value="テレビ・オンライン"
                ></v-radio>
                <v-radio label="現地" value="現地"></v-radio>
                <v-radio label="スポーツバー" value="スポーツバー"></v-radio>
                <v-radio label="その他" value="その他"></v-radio>
              </v-radio-group>
            </v-row>
                </v-container>
            <v-chip class="ma-2" label>
              観戦レビュー
            </v-chip>
            <v-row justify="center">
              <v-col cols="10">
                <v-container fluid>
                  <v-textarea
                    name="input-7-1"
                    outlined
                    label="観戦レビューを書く"
                    auto-grow
                    value=""
                    v-model="review.review"
                  ></v-textarea>
                </v-container>
              </v-col>
            </v-row>

            <v-row justify="start">
              <v-col cols="1"></v-col>
              <v-col cols="9" sm="6" md="4">
                <v-file-input
                  class="px-5"
                  label="写真を投稿する"
                  dense
                  outlined
                  show-size
                  accept="image/png, image/jpeg, image/bmp"
                  name="file"
                  prepend-icon="mdi-camera"
                  @change="onFileChange"
                />
              </v-col>
              <v-col>
                <v-img
                  class="mb-3"
                  height="125"
                  width="125"
                  v-if="url"
                  :src="url"
                ></v-img
              ></v-col>
            </v-row>
            <!-- <textarea rows="10" cols="60" v-model="review.review" placeholder="Write your REVIEW!!"></textarea> -->
            <!-- <input type="image" v-model="review.image"> -->
            <v-chip class="ma-2" label>
              詳細情報
            </v-chip>
            <v-expansion-panels class="mb-6">
              <v-col cols="10">
                <v-expansion-panel>
                  <v-expansion-panel-header expand-icon="mdi-menu-down"
                    >詳細情報を投稿する</v-expansion-panel-header
                  >
                  <div v-if="review.howToWatch == '現地'">
                    <v-expansion-panel-content>
                      <v-container fluid>
                        <v-text-field
                          v-model="review.seat"
                          label="席種"
                        ></v-text-field>
                        <v-textarea
                          name="input-7-1"
                          outlined
                          label="スタジアムレビューを書く"
                          auto-grow
                          value=""
                          v-model="review.stadiumReview"
                        ></v-textarea>
                        <v-textarea
                          name="input-7-1"
                          outlined
                          label="グルメレビューを書く"
                          auto-grow
                          value=""
                          v-model="review.foodReview"
                        ></v-textarea>
                        <v-textarea
                          name="input-7-1"
                          outlined
                          label="マスコットレビューを書く"
                          auto-grow
                          value=""
                          v-model="review.mascot"
                        ></v-textarea>
                      </v-container>
                    </v-expansion-panel-content>
                  </div>
                  <div v-if="review.howToWatch == 'スポーツバー'">
                    <v-expansion-panel-content>
                      <v-container fluid>
                        <v-text-field
                          v-model="review.barName"
                          label="スポーツバー名"
                        ></v-text-field>

                        <v-textarea
                          name="input-7-1"
                          outlined
                          label="スポーツバーのレビューを書く"
                          auto-grow
                          value=""
                          v-model="review.barReview"
                        ></v-textarea>
                      </v-container>
                    </v-expansion-panel-content>
                  </div>
                </v-expansion-panel>
              </v-col>
            </v-expansion-panels>

            <v-btn class="mr-4" @click="submitClick">投稿する</v-btn>
            <backButton />
          </form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  </div>
</template>

<script>
// import reviews from "../components/GameReviews";
// import axios from "axios";
import swal from "sweetalert";
import backButton from "@/components/backButton";

export default {
  props: ["id"],
  components: {
    backButton,
  },
  data() {
    return {
      url: null,
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
  async mounted() {
    let response = await this.$http.get(
      "api/auth/findGameDetail",
      // .get("http://localhost:8080/api/auth/findGameDetail",
      {
        params: {
          id: this.id,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );
    this.game = response.data.game;
    console.log(this.game);
  },
};
</script>
