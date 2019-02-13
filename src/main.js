import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire);

var config = {
    apiKey: "AIzaSyC61AXsUVp7pI_yMiFOf7aTE0sf9RHkIUk",
    authDomain: "axphd-combinazioni-bd807.firebaseapp.com",
    databaseURL: "https://axphd-combinazioni-bd807.firebaseio.com",
    projectId: "axphd-combinazioni-bd807",
    storageBucket: "axphd-combinazioni-bd807.appspot.com",
    messagingSenderId: "387056493961"
  };

Firebase.initializeApp(config);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
