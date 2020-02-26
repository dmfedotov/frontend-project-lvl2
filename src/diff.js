import { union, isEqual, isObject } from 'lodash';

const buildAst = (data1, data2, acc) => {
  const keys = union(Object.keys(data1), Object.keys(data2)).sort();

  const ast = keys.map((key) => {
    const valueBefore = data1[key];
    const valueAfter = data2[key];
    const hasChildren = isObject(valueBefore) && isObject(valueAfter);

    if (hasChildren) {
      return { name: key, type: 'nested', children: buildAst(valueBefore, valueAfter, []) };
    }
    if (isEqual(valueBefore, valueAfter)) {
      return { name: key, type: 'unchanged', value: valueBefore };
    }
    if (!valueBefore) {
      return { name: key, type: 'added', valueAfter };
    }
    if (!valueAfter) {
      return { name: key, type: 'deleted', valueBefore };
    }

    return {
      name: key, type: 'changed', valueBefore, valueAfter,
    };
  }, acc);

  return ast;
};

export default (data1, data2) => buildAst(data1, data2, []);
