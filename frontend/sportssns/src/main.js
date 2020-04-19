import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import vuetify from './plugins/vuetify';
import store from "./store";
import firebase from "firebase";

const base = axios.create({
  baseURL: "http://localhost:8080"
});
Vue.prototype.$http = base;

Vue.config.productionTip = false

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB05I2hpC3zZXyvI7zX8_8iSPSW7SRLtR8",
    authDomain: "kansen-sns.firebaseapp.com",
    databaseURL: "https://kansen-sns.firebaseio.com",
    projectId: "kansen-sns",
    storageBucket: "kansen-sns.appspot.com",
    messagingSenderId: "283712574757",
    appId: "1:283712574757:web:3d6d7edd98e7e7b3d576cc",
    measurementId: "G-HXGF4P6LZH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
