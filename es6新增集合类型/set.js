// const set = new Set();
// console.log("set", set);

// // const newArr = Array.from(new Set([1, 2, 2, 3, 3, 4]));
// const newArr = [...new Set([1, 2, 2, 3, 3, 4])];
// console.log("newArr", newArr); // 1, 2, 3, 4
// const str = "aaab";
// const newStr = [...new Set(str)].join("");
// console.log("newStr", newStr);

// const set2 = new Set([1, 2, 3, [1, 2, 3]]);

// for (const item of set2) {
//     console.log("item", item);
// }

// set2.forEach((value, value2, self) => {
//     console.log("value", value, value2, self);
// })

// const arr1 = [2, 2, 3, 4, 5, 6, 8];
// const arr2 = [1, 2, 9, 7, 10];
// const newArr = [...new Set([...arr1, ...arr2])]
// console.log("newArr", newArr);

// const arr1 = [2, 2, 3, 4, 5, 6, 8];
// const arr2 = [1, 2, 9, 7, 10];

// const uniqueArr1 = [...new Set(arr1)];
// const newArr = uniqueArr1.filter(v => arr2.includes(v));
// console.log("newArr", newArr);

  // 我们可以先得到并集
  const arr1 = [2, 2, 3, 4, 5, 6, 8];
  const arr2 = [1, 2, 9, 7, 10];
  const unionArr = [...new Set([...arr1, ...arr2])];
  const differenceArr = unionArr.filter(value => {
      if (arr1.includes(value) && !arr2.includes(value)) return true;
      else if (!arr1.includes(value) && arr2.includes(value)) return true;
      return false;
  })
  console.log("differenceArr", differenceArr);