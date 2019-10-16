import Vue from "vue";
import VueRouter from "vue-router";
import ScanQR from "../views/ScanQR.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: ScanQR
  },
  {
    path: "/scan-qr",
    name: "scan-qr",
    component: () =>
      import(/* webpackChunkName: "generate-qr" */ "../views/ScanQR.vue")
  },
  {
    path: "/generate-qr",
    name: "generate-qr",
    component: () =>
      import(/* webpackChunkName: "generate-qr" */ "../views/GenerateQR.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
