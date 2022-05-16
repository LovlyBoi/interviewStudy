<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import CheckEditor from './components/CheckEditor.vue';
  import { ref, watchEffect } from "vue"

  const productsRef = ref([ 
    { id: 1, cell: true, title: "iPhone12" },
    { id: 2, cell: false, title: "MacBook Pro" },
    { id: 3, cell: true, title: "iPad" },
    { id: 4, cell: true, title: "Apple Watch" }
  ]);

  const inputRef = ref("");

</script>

<template>
  <CheckEditor v-model.trim="inputRef" />
  <div v-for="product in productsRef" :key="product.id" v-if="product.cell">
    {{ product.title }}
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
