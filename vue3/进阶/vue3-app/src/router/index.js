// dependencies
import { createRouter, createWebHistory } from "vue-router";

// routes config
import routes from "./routes";

const router = createRouter({
 history: createWebHistory(),
 routes
})

export default router;