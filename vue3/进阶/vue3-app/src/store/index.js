import { createStore } from "vuex"
import loginModule from "./loginModule"

const store = createStore({
 modules: {
  loginModule
 }
})

console.log("store", store);

export default store;