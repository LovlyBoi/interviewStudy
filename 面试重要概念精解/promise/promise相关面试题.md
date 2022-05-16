# promise面试题

1. 下面代码的输出结果是什么
    ```js
    const promise = new Promise((resolve, reject) => {
        console.log(1);
        resolve();
        console.log(2);
    })
    promise.then(() => {
        console.log(3);
    });

    console.log(4);

    // 1 2 4 3
    ```