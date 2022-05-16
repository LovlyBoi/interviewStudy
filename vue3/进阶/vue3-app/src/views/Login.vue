<template>
  <div class="login-box">
      <el-form
    ref="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="username">
      <el-input
        v-model="loginData.username"
        type="text"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="password">
      <el-input
        v-model="loginData.password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
       @click="login"
        >Submit</el-button
      >
      <el-button @click="checkIsLogin">{{ loading ? "正在登录中" : "查询是否登录" }}</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
 import { reactive, readonly, computed } from "vue";
 import { useStore } from "vuex";
 const loginData = reactive({
  username: "",
  password: ""
 })
 const currentLoginUser = computed(() => store.state.loginModule.user)
 const loading = computed(() => store.state.loginModule.loading)

 const store = useStore();
 
 const login = () => {
  console.log("我要登录了", loginData);
  store.dispatch("loginModule/login", loginData);
 }

 const checkIsLogin = () => {
  console.log("我要检查是否已经有人登录了")
  if (currentLoginUser.value) {
   alert(`当前已经有人登录了, 是${ currentLoginUser.value.name }`);
  } else {
   alert("当前还没有登录, 请登录");
  }
 }
</script>