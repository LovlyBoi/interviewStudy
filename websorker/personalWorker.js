let count = 0;

setInterval(() => {
    count += 1;
    self.postMessage(count)
}, 1000)