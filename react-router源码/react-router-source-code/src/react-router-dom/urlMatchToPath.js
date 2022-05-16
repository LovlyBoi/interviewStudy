import { pathToRegexp } from "path-to-regexp";

/**
 * 该函数可以给你返回一个react-router里的match对象
 * {
 *  params: { [key: string]: any }; // 如果targetPath和urlRules匹配上了, params里会给你将对应的参数返回
 *  isExact: boolean; // 是否是精确匹配路径
 *  path: string; // 匹配成功以后的匹配到的那一段路径名
 *  url: string; // 对应的路径规则
 * }
 * @param {*} urlRules 
 * @param {*} targetPath 
 * @param {*} options 
 */
export default function urlMatchToPath(urlRules, targetPath, options) {
    const keys = [];
    const regexp = pathToRegexp(urlRules, keys, composeOptionsToValidOptions(options));
    const matchResult = regexp.exec(targetPath);
    console.log("matchResult", matchResult, urlRules, regexp);
    if (!matchResult) return null; // 啥都没匹配上
    const [actuallyMatchPath, ...restValues] = matchResult;
    const params = analyseParams(restValues, keys);
    return {
        isExact: actuallyMatchPath === targetPath,
        path: actuallyMatchPath,
        url: urlRules,
        params
    }
}

// 主要是因为react-router中我们使用exact来区分是否精确匹配
// 而path-to-regexp这个库里他使用end来区分是否精确匹配
function composeOptionsToValidOptions(options) {
    const composeOptions = {
        sensitive: false,
        exact: false,
        strict: false,
        ...options
    }
    return {
        sensitive: composeOptions.sensitive,
        end: composeOptions.exact,
        strict: composeOptions.strict
    }
}

function analyseParams(matchValues = [], pathKeys = []) {
    const params = {};
    for (let i = 0; i < pathKeys.length; i++) {
        params[pathKeys[i].name] = matchValues[i];
    }
    return params;
}