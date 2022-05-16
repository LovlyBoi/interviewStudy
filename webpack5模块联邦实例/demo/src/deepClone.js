import _ from "lodash";

export default function deepClone(target) {
    return _.cloneDeep(target);
}