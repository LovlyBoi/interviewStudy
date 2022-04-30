// // 防抖: n秒后执行事件, 如果n秒内重复触发, 则重新开始计时
function debounce(callback, duration) {
    let timer = null;
    let result;
    return (...args) => { // 返回出去一个新函数
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            result = callback.apply(this, args);
            clearTimeout(timer);
        }, duration)
        return result;
    }
}

// 节流: n秒内只触发一次事件, 如果在n秒内重复触发, 只算做一次
function throttle(duration, callback) {
    let tickTime = null; // 是否正在计时
    return (...args) => {
        const now = new Date().getTime();
        if (tickTime && tickTime > now) return // 证明正在有触发的事件 而且还没有到时间点
        tickTime = new Date().getTime() + duration;
        return callback.apply(this, args);
    }
}

function isObject(value) {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
  }  


window.debounce = debounce; 
window.throttle = throttle; 
export default debounce