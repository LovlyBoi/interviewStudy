function findMedianInSortedArrays(fstNums = [], secNums = []) {
   if (!Array.isArray(fstNums)) fstNums = [];
   if (!Array.isArray(secNums)) secNums = [];

   if (fstNums.length > secNums.length) {
       [fstNums, secNums] = [secNums, fstNums];
   }

   const fstLen = fstNums.length;
   const secLen = secNums.length;

   let low = 0;
   let high = fstLen;

}

module.exports = findMedianInSortedArrays;