<template>
 <div>
   <input type="text" :value="modelValue" @input="handleInput" >
 </div>
</template>

<script setup>
import { ref } from "vue"

// 你好
 const props = defineProps({
  modelValue: String,
  modelModifiers: Object
 })
 const emits = defineEmits(["update:modelValue"])

 const handleInput = (e) => {
  console.log("event origin target", props.modelModifiers)
  let _value = e.target.value;
  if (props.modelModifiers.trim) {
    console.log("进入了这个判断");
    _value = _value.trim();
  }
  console.log("_value", _value)
  emits("update:modelValue", _value)
 }

 const titleRef = ref("");

</script>

<style lang="scss" scoped>

</style>