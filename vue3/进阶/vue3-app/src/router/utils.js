// dependencies
import { defineAsyncComponent, h } from "vue";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

// components
import ErrorComponent from "../components/ErrorComponent.vue";
import LoadingComponent from "../components/LoadingComponent.vue";

// 该方法用于得到一个异步组件
// componentPath: 异步加载的组件路径
export function receiveAsyncComponent(componentPath = "", config = {}) {
 const { shouldDelay = false, duration = 0, ...officialConfig } = config
 return defineAsyncComponent({
  loader: async () => {
   // 当开始加载的时候开启滚动条
   NProgress.start();
   if (shouldDelay) await delayHandler(duration);
   // 如果在这里发生了错误, 错误将会被捕获且会展示ErrorComponent, 但是组件内部的错误并不会被捕获
   const Component = import(componentPath); 

   // 当获得组件以后关闭滚动条
   NProgress.done();
   return Component; // 返回加载完毕的组件
  },
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent,
  ...officialConfig
 })
}

function delayHandler(duration) {
 let _timer = null
 return new Promise((resolve) => {
  _timer = setTimeout(() => {
    resolve(true)
    clearTimeout(_timer);
  }, duration)
 })
}