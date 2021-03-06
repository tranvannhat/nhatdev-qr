import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import VueClipboard from "vue-clipboard2";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/scss/main.scss";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueClipboard);
Vue.component(VueQrcode.name, VueQrcode);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
