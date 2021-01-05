import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueTypedJs from 'vue-typed-js'

// Socket.io
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
Vue.use(VueSocketIOExt, io('localhost:3000'))

Vue.use(VueTypedJs)

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
