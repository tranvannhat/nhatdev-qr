import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/scan" },
  {
    path: "/scan",
    name: "scan",
    component: () =>
      import(/* webpackChunkName: "generate-qr" */ "../views/ScanQR.vue")
  },
  {
    path: "/generate",
    name: "generate",
    component: () =>
      import(/* webpackChunkName: "generate-qr" */ "../views/GenerateQR.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
