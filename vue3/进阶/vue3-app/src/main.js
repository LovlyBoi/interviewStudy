import { createApp } from 'vue'
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import App from './App.vue'

// store
import store from "./store"

// router
import router from "./router";

import "./reactivityAPI";

createApp(App)
 .use(router)
 .use(store)
 .use(ElementPlus)
 .mount('#app')
