<template>
  <v-form @submit.prevent="editReview">
    <v-container>
      <v-row>
        <v-col cols="6"
          ><v-subheader
          :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'subtitle-1'
                          : 'headline',
                      ]" class="font-weight-black pb-3"
            v-text="'ユーザーネーム'"
          ></v-subheader
        ></v-col>
        <v-col cols="6">
          <v-text-field
            dense
            label="ユーザーネーム"
            v-model="user.username"
          ></v-text-field>
        </v-col>
        <v-col cols="6"
          ><v-subheader
            :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'subtitle-1'
                          : 'headline',
                      ]" class="font-weight-black pb-3"
            v-text="'プロフィール画像'"
          ></v-subheader>
          <v-img
            class="blue--text align-end"
            height="200px"
            v-if="user.image"
            :src="user.image"
          >
          </v-img>
        </v-col>
        <v-col cols="6">
          <v-file-input
            label="File input"
            filled
            show-size
            accept="image/png, image/jpeg, image/bmp"
            name="file"
            prepend-icon="mdi-camera"
            @change="onFileChange"
          />
          <v-img height="125" width="125" v-if="url" :src="url"></v-img>
        </v-col>

        <v-col cols="6"
          ><v-subheader
            :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'subtitle-1'
                          : 'headline',
                      ]" class="font-weight-black pb-3"
            v-text="'メールアドレス'"
          ></v-subheader
        ></v-col>
        <v-col cols="6">
          <v-text-field
            dense
            label="メールアドレス"
            v-model="user.email"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-subheader :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'subtitle-1'
                          : 'headline',
                      ]" class="font-weight-black pb-3" v-text="'性別'"></v-subheader>
        </v-col>
        <v-col cols="6">
          <v-radio-group v-model="user.gender" row>
            <v-radio label="男性" value="male"></v-radio>
            <v-radio label="女性" value="female"></v-radio>
            <v-radio label="その他" value="other"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="6">
          <v-subheader
            :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'subtitle-1'
                          : 'headline',
                      ]" class="font-weight-black pb-3"
            v-text="'好きなスポーツ'"
          ></v-subheader>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="user.favoriteSport"
            :items="sports"
            label="選択"
            chips
            hint=""
            persistent-hint
          ></v-select>
        </v-col>
        <!-- <v-col cols="6"
          ><v-subheader
            :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'subtitle-1'
                          : 'headline',
                      ]" class="font-weight-black pb-3"
            v-text="'応援しているチーム'"
          ></v-subheader
        ></v-col>
        <v-col cols="6">
          <v-select
            v-model="user.favoriteSports"
            :items="teams"
            label="選択"
            multiple
            chips
            hint=""
            persistent-hint
          ></v-select>
        </v-col> -->

        <v-col cols="6"
          ><v-subheader
            :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'subtitle-1'
                          : 'headline',
                      ]" class="font-weight-black pb-3"
            v-text="'お気に入りスタジアム'"
          ></v-subheader
        ></v-col>
        <v-col cols="6">
          <v-select
            v-model="user.favoriteStadium"
            :items="stadiums"
            label="選択"
            chips
            hint=""
            persistent-hint
          ></v-select>
        </v-col>

        <v-col cols="6"
          ><v-subheader :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'subtitle-1'
                          : 'headline',
                      ]" class="font-weight-black pb-3" v-text="'プロフィール'"></v-subheader
        ></v-col>
        <v-col cols="6">
          <v-textarea
            filled
            label="プロフィールを書こう！"
            auto-grow
            v-model="user.profile"
            value=""
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-btn class="mr-4" @click="editReview">submit</v-btn>
        <backButton />
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// import axios from "axios";
import swal from "sweetalert";
import backButton from "@/components/backButton";

export default {
  components: {
    backButton,
  },
  data() {
    return {
      url: null,
      imageFile: null,
      //選択肢
      sports: ["サッカー", "野球", "バスケットボール", "ラグビー"],
      // teams: ["サッカー", "野球", "バスケットボール", "ラグビー"],
      stadiums: [
        "味の素スタジアム",
        "神宮球場",
        "東京ドーム",
        "西が丘競技場",
        "秩父宮ラグビー場",
        "国立代々木競技場",
      ],
      user: {},
      // favoriteTeam: {},
      // favoriteStadium: {},
      // favoriteSports: {},
    };
  },
  async mounted() {
    let response = await this.$http.get(
      "api/auth/user",
      // .get("http://localhost:8080/api/auth/user", {
      {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      }
    );

    this.user = response.data.user;
  },
  methods: {
    onFileChange(e) {
      console.log(e);
      this.imageFile = e;
      this.url = URL.createObjectURL(this.imageFile);
      console.log(this.url);
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
          this.user.image = res.data.path;
          if (res.data.status === "error") {
            alert(res.data.error);
          } else {
            console.log(this.user);
            try {
              let response = await this.$http.post(
                "api/auth/updateProfile",
                this.user,
                {
                  headers: {
                    token: localStorage.getItem("jwt"),
                  },
                }
              );
              console.log(response);
              console.log(this.user);
              this.$router.push({
                name: "myPage",
                params: { id: this.user.id },
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
          console.log(this.user);

          let response = await this.$http.post(
            "api/auth/updateProfile",
            this.user,
            {
              headers: {
                token: localStorage.getItem("jwt"),
              },
            }
          );
          console.log(response);
          console.log(this.user);
          this.$router.push({
            name: "myPage",
            params: { id: this.$store.state.auth.user.id },
          });
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
  },
};
</script>
