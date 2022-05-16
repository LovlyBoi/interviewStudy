function getRandomArr(number) {
    const result = [];
    for (let i = 0; i <= number; i ++) {
        result.push(i);
    }
    result.sort(() => Math.random() > 0.5 ? -1 : 1);
    return result;
}

console.log("get", getRandomArr(7));