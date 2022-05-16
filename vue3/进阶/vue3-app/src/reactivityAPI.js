// // reactivity api
// import { reactive, ref, readonly, computed } from "vue";

// const state = reactive({ a: 1, b: 2 });

// const readOnlyState = readonly(state);

// window.state = state;
// window.readOnlyState = readOnlyState;

// const objRef = ref({a: 1, b: 2});

// window.objRef = objRef;

// const computedValue = computed(() => {
//  console.log("computed");
//  return state.a + state.b;
// })

// window.computedValue = computedValue;

// import { reactive, readonly, ref, computed } from "vue";
// const state = reactive({
//  firstName: "Alex",
//  lastName: "Edward"
// });

// const fullName = computed(() => {
//  console.log("computed executed");
//  return `${state.firstName} ${state.lastName}`;
// })

// console.log("state ready");
// console.log("fullName is", fullName.value);
// console.log("fullName is", fullName.value);

// const readOnlyState = readonly(state);
// console.log(readOnlyState === state);

// const stateRef = ref(state);
// console.log(stateRef.value === state);

// state.firstName = "Alice";
// state.lastName = "Green";

// console.log(readOnlyState.firstName, readOnlyState.lastName);
// console.log("fullName is", fullName.value);
// console.log("fullName is", fullName.value);

// function useUser() {
//  const currentUser = reactive({
//   name: "Alex",
//   age: 18
//  }) // 会从vuex中取数据

//  function withComparePassedValueIsEqual(fn, originTarget, propName) {
//   return function(newValue, ...restArgs) {
//    if (newValue === originTarget[propName]) return;
//    restArgs.unshift(newValue);
//    return fn.apply(this, restArgs);
//   }
//  }

//  const readOnlyUser = readonly(currentUser);
//  const setUserName = withComparePassedValueIsEqual((name) => {
//   currentUser.name = name;
//  }, currentUser, "name");
//  const setUserAge = withComparePassedValueIsEqual((age) => {
//   currentUser.age = age;
//  }, currentUser, "age");

//  return {
//   user: readOnlyUser,
//   setUserName,
//   setUserAge
//  }
// }

// const { user, setUserAge, setUserName } = useUser()

// console.log("user", user.name, user.age);

// user.name = "!23"

// setUserName("Alex");

// setUserName("Edward")

// console.log("user", user.name, user.age);

// import { reactive, readonly } from "vue";
// function useDebounce(obj = {}, duration = 0) {
//  let reactiveObj = reactive(obj);
//  const readonlyObj = readonly(reactiveObj);
//  let _timer = null;
//  const setValue = (newValue) => {
//   return new Promise((resolve, reject) => {
//    clearTimeout(_timer);
//   _timer = setTimeout(() => {
//     Object.assign(reactiveObj, newValue);
//     clearTimeout(_timer);
//     resolve(true);
//   }, duration)
//   })
//  }
//  return {
//   value: readonlyObj,
//   setValue
//  }
// }

// const { value, setValue } = useDebounce({ a: 10 }, 1000);

// console.log("value", value.a);
// setValue({ b: 20 }).then(() => {
//  console.log("value", value.b);
// });

// import { watch, reactive, ref } from "vue";

// const state = reactive({ a: 1, b: 2 });

// watch(state, (newValue, oldValue) => {
//  console.log("newValue", newValue, oldValue);
// // })

// // state.a = 10;

// import { reactive, watchEffect, watch } from "vue";
// const state = reactive({
//  count: 0
// })

// watchEffect(() => {
//  console.log("watchEffect", state.count);
// })

// watch(() => state.count, (newCount, oldCount) => {
//  console.log("watch", newCount, oldCount);
// })

// console.log("start");

// setTimeout(() => {
//  console.log("timeout");
//  state.count++;
//  state.count++;
// })

// state.count++;
// state.count++;
// console.log("end");

import { reactive, toRefs } from "vue";

const stateOne = reactive({ a: 10 });
const refOne = toRefs(stateOne);

console.log("refOne.a", refOne.a.value);