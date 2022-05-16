// 手写set

class MySet {
    data = [];
    constructor(iterator) {
        // 如果你给我传了一个迭代对象进来, 我就要把这个迭代对象一个一个的都放进data里
        // 在此之前我先检查一下你是不是可迭代对象
        if(typeof iterator[Symbol.iterator] !== "function") {
            throw new TypeError("你传递的参数必须是一个iterator");
        }

        for (const item of iterator) {
            this.add(item);
        }
    }

    *[Symbol.iterator]() {
        for (const item of this.data) {
            yield item;
        }
    }

    get size() {
        return this.data.length;
    }

    add(item) {
        // 添加数据我得先看你有没有了
        if (this.has(item)) {
            return;
        }
        this.data.push(item);
    }

    delete(item) {
        const index = this.data.findIndex(item);
        if (index === -1) return true;
        this.data.splice(index, 1);
        return true;
    }

    has(item) {
        return this.data.includes(item);
    }

    forEach(callback) {
        for (const item of this.data) {
            callback(item, item, this.data);
        }
    }
}

const arr1 = [2, 2, 3, 4, 5, 6, 8];
const arr2 = [1, 2, 9, 7, 10];
const unionArr = [...new MySet([...arr1, ...arr2])];
const differenceArr = unionArr.filter(value => {
    if (arr1.includes(value) && !arr2.includes(value)) return true;
    else if (!arr1.includes(value) && arr2.includes(value)) return true;
    return false;
})
console.log("differenceArr", differenceArr);

const setObj = new MySet([...arr1, ...arr2]);

console.log("size", setObj.size, setObj);