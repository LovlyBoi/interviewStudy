<template>
 <div class="home-container">
   <div class="area-one">区域1</div>
   <div class="area-two">区域2</div>
   <div class="async-area-three"><BlockThree /></div>
   <div class="area-four">区域4</div>
   <div class="async-area-five">异步区域5</div>
   <div class="area-six">区域6</div>
 </div>
</template>

<script setup>
 import { receiveAsyncComponent } from "../router/utils";
 const BlockThree = receiveAsyncComponent("../components/BlockThree.vue", {
  shouldDelay: true,
  duration: 2000
 });
</script>

<style>
.home-container {
 width: 800px;
 height: 400px;
 border: 1px solid #ddd;
 margin: 0 auto;
 padding: 10px;
 box-sizing: border-box;
 display: flex;
 flex-wrap: wrap;
 gap: 15px;
}

.home-container > div {
 border: 1px solid #ddd;
 display: flex;
 align-items: center;
 justify-content: center;
}

.area-one {
 width: 200px;
 height: 200px;
}
.area-two {
 width: 200px;
 height: 200px;
}
.async-area-three {
 width: 330px;
 height: 200px;
}

.area-four {
 width: 300px;
 height: 150px;
}

.async-area-five {
 width: 200px;
 height: 150px;
}

.area-six {
 width: 230px;
 height: 150px;
}
</style>