import Vue from "vue";
import App from "./App.vue";
import VueQrcodeReader from "vue-qrcode-reader";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// plugins
Vue.use(VueQrcodeReader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
