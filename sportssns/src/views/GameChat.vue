<template>
  <div id="app" class="app">
    <!-- <v-img  src="../../public/uploads/41066.jpg" > -->
    <transition-group name="chat" tag="div" class="list content" >
      <section v-for="{ key, name, message } in chat" :key="key" >
        <div v-if="currentUser.username !=name">
        <!-- <div class="item-image">
          <img :src="user.image" width="40" height="40" />
        </div> -->
        <div class="item-detail">
          <div class="item-name">{{ name }}</div>
          <div class="item-message">
            <nl2br tag="div" :text="message" />
          </div>
        </div>
        </div>

<!-- 自分が投稿した場合  -->
        <div v-if="currentUser.username ==name" class="item" >
        <!-- <div class="item-image">
          <img :src="user.image" width="40" height="40" />
        </div> -->
        <div class="item-detail">
          <div class="item-name">{{ name }}</div>
          <div class="item-message">
            <nl2br tag="div" :text="message" />
          </div>
        </div>
        </div>
      </section>
    </transition-group>

    <!-- 入力フォーム -->
    <form action="" @submit.prevent="doSend" class="form" >
      <textarea
        v-model="input"
        @keydown.enter.exact.prevent="doSend"
        maxlength="400"
      ></textarea>
      <button type="submit" class="send-button">送信</button>
    </form>
        <!-- <v-form action="" @submit.prevent="doSend" class="form">
      <v-container fluid>
        <v-row justify="center"
          align="center">
          <v-col cols="12" md="6" 
          
          >
        <v-textarea
          outlined
          row-height="15"
          rows="1"
          background-color="grey lighten-2"
          v-model="input"
          @keydown.enter.exact.prevent="doSend"
        ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <button type="submit" class="send-button">送信</button>
    </v-form> -->
        <!-- </v-img> -->
  </div>
</template>

<script>
// firebase モジュール
import firebase from "firebase";
import Nl2br from "vue-nl2br";
export default {
  props: ["gameId"],
  components: { Nl2br },
  data() {
    return {
      user: this.currentUser, // ユーザー情報
      chat: [], // 取得したメッセージを入れる配列
      input: "", // 入力したメッセージ
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.user = this.currentUser;
    const ref_message = firebase.database().ref("game/" + this.gameId);
    if (this.user) {
      this.chat = [];
      // message に変更があったときのハンドラを登録
      ref_message.on("child_added", this.childAdded);
    } else {
      // message に変更があったときのハンドラを解除
      ref_message.off("child_added", this.childAdded);
    }
  },
  methods: {
    // スクロール位置を一番下に移動
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    // 受け取ったメッセージをchatに追加
    // データベースに新しい要素が追加されると随時呼び出される
    childAdded(snap) {
      const message = snap.val();
      this.chat.push({
        key: snap.key,
        name: message.name,
        message: message.message,
      });
      this.scrollBottom();
    },
    doSend(e) {
      console.log(e.type)
       if (e.keyCode !== 13&&e.type !== "submit") return
      if (this.input.length) {
      // firebase にメッセージを追加
      firebase
        .database()
        .ref("game/" + this.gameId)
        .push(
          {
            message: this.input,
            name: this.currentUser.username,
            // image: this.currentUser.image,
          },
          () => {
            this.input = ""; // フォームを空にする
          }
        );
    }
    }
  },
};
</script>
<style scoped>
.app{
  background-image: url("../../public/uploads/41066.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
* {
  margin: 0;
  box-sizing: border-box;
}
.header {
  background: #3ab383;
  margin-bottom: 1em;
  padding: 0.4em 0.8em;
  color: #fff;
}
.content {
  margin: 0 auto;
  padding: 10px 10px;
  max-width: 600px;
  /* height: 100vh; */
}
.form {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  /* left: 10%; */
  height: 5em;
  width: 100%;
  background:#424242;
}
.form textarea {
  border: 1px solid #ccc;
  border-radius: 2px;
  height: 3em;
  width: 60%;
  resize: none;
  background-color: white;
  
}
.list {
  /* margin-bottom: 4em; */
  padding-bottom: 5em;
  padding-top: 5em;
}
/* 自分が投稿した場合 */
.item {
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.8em;
   justify-content: flex-end;
}
.item .item-name{
  text-align: right;
}
.item-image img {
  border-radius: 20px;
  vertical-align: top;
}
.item-detail {
  margin: 0 0 0 1.4em;
}
.item-name {
  font-size: 75%;
  color: white;
}
.item-message {
  position: relative;
  display: inline-block;
  padding: 0.8em;
  background: #deefe8;
  border-radius: 4px;
  line-height: 1.2em;
  max-width: 600px;
}
.item-message div{
  max-width: 600px;
  word-break: break-all;
}
/* .item-message::before {
  position: absolute;
  content: " ";
  display: block;
  left: -16px;
  bottom: 12px;
  border: 4px solid transparent;
  border-right: 12px solid #deefe8;
} */
.send-button {
  height: 2em;
  width: 4em;
  margin-left: 1em;
  color: white;
  background-color: grey;
}
/* トランジション用スタイル */
.chat-enter-active {
  transition: all 1s;
}
.chat-enter {
  opacity: 0;
  transform: translateX(-1em);
}
</style>
