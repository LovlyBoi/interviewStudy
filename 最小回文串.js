const minInsertions = s => {
    const LEN = s.length;
    const dp = new Uint16Array(LEN);
    for (let i = LEN - 2; i >= 0; i--) {
      let prev = 0;
      for (let j = i + 1; j < LEN; j++) {
        const tmp = dp[j];
        dp[j] = s[i] === s[j] ? prev : 1 + Math.min(dp[j], dp[j - 1]);
        prev = tmp;
      }
    }
    return dp[LEN - 1];
  };
  

console.log("22", minInsertions("msabsd"));