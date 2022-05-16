const _on = Symbol("on");

function deepClone(origin) {
    const result = Array.isArray(origin) ? [] : {};
    for (const key in origin) {
        if (typeof origin[key] === "object") result[key] = deepClone(origin[key]);
        else result[key] = origin[key];
    }
    return result;
}

class MyEventEmitter {
    eventMap = new Map([])
    on(eventName, listener) {
        this[_on](eventName, {
            listener,
            once: false
        })
    }

    [_on](eventName, listenerConf) {
        const matchEventQueue = this.eventMap.get(eventName); 
        if (matchEventQueue) {
            // 代表已经有了 直接追加进去
            this.eventMap.set(eventName, [
                ...matchEventQueue,
                listenerConf
            ])
        } else {
            // 代表还没有
            this.eventMap.set(eventName, [listenerConf]);
        }
    }

    emit(eventName, ...args) {
        const matchEventQueue = this.eventMap.get(eventName);
        const spliceIndexArr = []
        matchEventQueue.forEach((listenerConf, index) => {
            const { listener, once } = listenerConf;
            listener(...args);
            if (once) spliceIndexArr.push(index);
        });
    
        spliceIndexArr.forEach(spliceIndex => {
            matchEventQueue.splice(spliceIndex, 1);
        })
    }

    once(eventName, listener) {
        this[_on](eventName, {
            listener,
            once: true
        })
    }

    off(eventName, listener) {
        const matchEventQueue = this.eventMap.get(eventName);
        const index = matchEventQueue.findIndex(listenerConf => listenerConf.listener === listener);
        if (index < 0) return false;
        matchEventQueue.splice(index, 1);
    }
}


const eventEmitter = new MyEventEmitter();

eventEmitter.on("click", () => {
    console.log("click");
})

eventEmitter.on("click", () => {
    console.log("click2");
})

eventEmitter.once("click", () => {
    console.log("click once");
})

const fn = () => { console.log("click target") }
eventEmitter.on("click", fn);

eventEmitter.emit("click");
eventEmitter.emit("click");

eventEmitter.off("click", fn);


eventEmitter.emit("click");

