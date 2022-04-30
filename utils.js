module.exports = {
    cloneDeep: (targetObj) => {
        return JSON.parse(JSON.stringify(targetObj));
    }
}