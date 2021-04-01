import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [

    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/CACCode")
    },
    {
      path: "/addCAC",
      name: "addCAC",
      component: () => import("./components/AddCACCode")
    },{
      path: "/cacCodes",
      alias: "/cacCodes",
      name: "cacCodes",
      component: () => import("./components/CACCodeList")
    }
  ]
});
