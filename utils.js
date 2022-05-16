module.exports = {
    cloneDeep: (targetObj) => {
        return JSON.parse(JSON.stringify(targetObj));
    }
}

console.log("")
