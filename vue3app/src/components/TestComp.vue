<template>
    <input type="text" :value="modelValue" @input="handleInput" >
</template>

<script setup>
import { defineProps, watchEffect } from "vue";
const props = defineProps({
    modelValue: String,
    modelModifiers: Object, // 声明一下属性修饰符
})

watchEffect(() => {
    console.log("modelValue", props.modelValue);
})

const emits = defineEmits(["update:modelValue"])

const handleInput = (e) => {
    let _value = e.target.value;
    console.log("value", _value, props.modelValue, props.modelModifiers);
    if (props.modelModifiers.email) {
        _value = _value + "@163.com";
    }
    console.log("value2", _value);
    emits("update:modelValue", _value);
}

</script>

<style>

</style>