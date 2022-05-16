/**
 * 判断两个矩形是否相交: 主要的思路是利用好外包矩形
 * 如果两个矩形的宽加起来大于最小外包矩形的款且两个矩形的高加起来大于最小外包矩形的高, 则判断相交
 * 
 */
function isIntersect(fstRectangle, secRectangle) {
    const minWrapRectangleWidth = Math.abs(fstRectangle.x - secRectangle.x);
    const minWrapRectangleHeight = Math.abs(fstRectangle.y - secRectangle.y);
    if (fstRectangle.width + secRectangle.with >= minWrapRectangleWidth && fstRectangle.height + secRectangle.height >= minWrapRectangleHeight) {
        return true;
    }
    return false;
}