<template>
  <v-container>
    <v-card class="white lighten-4 p-5 m-5 " tile hover>
      <v-row justify="start" align="center" class="white ma-3 pa-3">
        <v-col cols="12" class="text-center">
          <h2 class="card-title">
            <router-link
              v-bind:to="{ name: 'gameDetail', params: { id: review.game.id } }"
            >
              {{ review.game.homeTeamId }} VS {{ review.game.awayTeamId }}
            </router-link>
          </h2>
          <p class="card-text">
            {{ review.game.gameDate }} at {{ review.game.stadiumName }}
          </p>
        </v-col>
        <v-col cols="1">
          <v-avatar>
          <v-img
            class="blue--text align-end"
            height="100%"
            width="100%"
            :src="supporter.image"
          ></v-img>
          </v-avatar>
        </v-col>
        <div v-if="!currentUser">
          <v-col>
            <h5 class="text-left">
              <router-link
                v-bind:to="{
                  name: 'supporterPage',
                  params: { supporterId: supporter.id },
                }"
                >{{ review.userName }}
              </router-link>
            </h5>
          </v-col>
        </div>
        <div v-if="currentUser">
          <v-col v-if="supporter.id != currentUser.id">
            <h5 class="text-left">
              <router-link
                v-bind:to="{
                  name: 'supporterPage',
                  params: { supporterId: supporter.id },
                }"
                >{{ review.userName }}
              </router-link>
            </h5>
          </v-col>
          <v-col v-if="supporter.id == currentUser.id">
            <h5 class="text-left">
              <router-link
                :to="{ name: 'myPage', params: { id: currentUser.id } }"
                >{{ review.userName }}
              </router-link>
            </h5>
          </v-col>
        </div>
        <v-col cols="12">
          <v-chip class="ma-2" label>
            観戦レビュー
          </v-chip>
          <p v-if="!editable" class="card-text">{{ review.review }}</p>
          <v-textarea
            v-if="editable"
            name="input-7-1"
            filled
            label="Review"
            auto-grow
            value=""
            v-model="review.review"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-chip class="ma-2" label>
            観戦方法
          </v-chip>
          <p v-if="!editable" class="card-text">{{ review.howToWatch }}</p>
          <v-radio-group v-model="review.howToWatch" row v-if="editable">
            <v-radio label="テレビ・オンライン" value="テレビ・オンライン"></v-radio>
            <v-radio label="現地" value="現地"></v-radio>
            <v-radio label="スポーツバー" value="スポーツバー"></v-radio>
            <v-radio label="その他" value="その他"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12" v-if="review.stadiumReview">
          <v-chip class="ma-2" label>
            スタジアムレビュー
          </v-chip>
          <p v-if="!editable" class="card-text">{{ review.stadiumReview }}</p>
          <v-textarea
            v-if="editable"
            name="input-7-1"
            filled
            label="Review"
            auto-grow
            value=""
            v-model="review.stadiumReview"
          ></v-textarea>
        </v-col>

        <v-col cols="12" v-if="review.foodReview">
          <v-chip class="ma-2" label>
            フードレビュー
          </v-chip>
          <p v-if="!editable" class="card-text">{{ review.foodReview }}</p>
          <v-textarea
            v-if="editable"
            name="input-7-1"
            filled
            label="Review"
            auto-grow
            value=""
            v-model="review.foodReview"
          ></v-textarea>
        </v-col>

        <v-col cols="12" v-if="review.mascot">
          <v-chip class="ma-2" label>
            マスコットレビュー
          </v-chip>
          <p v-if="!editable" class="card-text">{{ review.mascot }}</p>
          <v-textarea
            v-if="editable"
            name="input-7-1"
            filled
            label="Review"
            auto-grow
            value=""
            v-model="review.mascot"
          ></v-textarea>
        </v-col>

        <v-col cols="12" v-if="review.barName">
          <v-chip class="ma-2" label>
            スポーツバー名
          </v-chip>
          <p v-if="!editable" class="card-text">{{ review.barName }}</p>
          <v-text-field
            v-if="editable"
            v-model="review.barName"
            label="スポーツバー名"
          ></v-text-field>
        </v-col>

        <v-col cols="12" v-if="review.barReview">
          <v-chip class="ma-2" label>
            スポーツバーレビュー
          </v-chip>
          <p v-if="!editable" class="card-text">{{ review.barReview }}</p>
          <v-textarea
            v-if="editable"
            name="input-7-1"
            filled
            label="Review"
            auto-grow
            value=""
            v-model="review.barReview"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
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
            width="200px"
            v-if="review.image"
            :src="review.image"
          >
          </v-img>
          <v-img height="125" width="125" v-if="url" :src="url"></v-img>
          <v-btn color="primary" v-if="editable" @click="btnclick"
            >画像を変更する</v-btn
          >
        </v-col>

        <v-col cols="12" v-if="currentUser">
          <v-btn
            v-if="!editable && currentUser.id == review.userId"
            small
            color="primary"
            @click="edit"
            >修正する</v-btn
          >
          <v-btn
            v-if="!editable && currentUser.id == review.userId"
            small
            class="m-2"
            color="error"
            @click="deleteReview"
            >削除する</v-btn
          >
          <v-btn v-if="editable" class="mr-4" @click="editReview"
            >投稿する</v-btn
          >

          <backButton />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
// import axios from "axios";
import swal from "sweetalert";
import backButton from "@/components/backButton";

export default {
  components: {
    backButton,
  },
  props: ["id"],
  data() {
    return {
      url: null,
      imageFile: null,
      review: {},
      // user:{},
      supporter: null,
      editable: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    btnclick() {
      this.$refs.input.click();
    },
    onFileChange(e) {
      console.log(e);
      this.imageFile = e.target.files[0];
      console.log(this.imageFile);
      this.url = URL.createObjectURL(this.imageFile);
      console.log(this.url);
    },

    async deleteReview() {
      try {
        let response = await this.$http.post(
          "api/auth/deleteReview",
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
    },
    edit() {
      this.editable = true;
    },
    async editReview() {
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
            try {
              let response = await this.$http.post(
                "api/auth/updateReview",
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
            "api/auth/updateReview",
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
            name: "reviewDetail",
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
      "api/auth/showReviewDetail",
      // .get("http://localhost:8080/api/auth/showReviewDetail",
      {
        params: {
          id: this.id,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );

    this.review = response.data.review;
    console.log(this.review);

    let res = await this.$http.get(
      "api/auth/findSupporterInfo",
      // .get("http://localhost:8080/api/auth/user", {
      {
        params: {
          id: this.review.userId,
        },
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );

    this.supporter = res.data.supporter;
  },
};
</script>
