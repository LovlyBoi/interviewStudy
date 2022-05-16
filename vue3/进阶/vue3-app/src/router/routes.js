import { receiveAsyncComponent } from "./utils";

const routes = [
 {
  path: "/home",
  component: receiveAsyncComponent("../views/Home.vue")
 },
 {
  path: "/about",
  component: () => import("../views/About.vue")
 },
 {
  path: "/login",
  component: receiveAsyncComponent("../views/Login.vue")
 }
]

export default routes;