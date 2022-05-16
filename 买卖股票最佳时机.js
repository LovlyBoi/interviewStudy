function maxProfit(prices = []) {
    if (!Array.isArray(prices)) return 0;
    //     [7,1,5,3,6,4]
    // 输出：5
    let minIndex = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < prices[minIndex]) minIndex = i;
    }

    let maxIndex = minIndex;
    for (let i = maxIndex + 1; i < prices.length; i++) {
        if (prices[i] > prices[maxIndex]) maxIndex = i;
    }

    if (minIndex === maxIndex) return 0;
    return prices[maxIndex] - prices[minIndex];
}

console.log("22", maxProfit([7,6,4,3,1]));