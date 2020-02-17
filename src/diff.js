import { union, isEqual, isObject } from 'lodash';

const buildNode = (name, ...values) => {
  const [valueBefore, valueAfter] = values;

  if (!valueBefore) {
    return { name, type: 'added', valueAfter };
  }
  if (!valueAfter) {
    return { name, type: 'deleted', valueBefore };
  }

  return {
    name, type: 'changed', valueBefore, valueAfter,
  };
};

const buildAst = (data1, data2, acc) => {
  const keys = union(Object.keys(data1), Object.keys(data2)).sort();

  const ast = keys.map((key) => {
    const valueBefore = data1[key];
    const valueAfter = data2[key];
    const hasChildren = isObject(valueBefore) && isObject(valueAfter);

    if (!isEqual(valueBefore, valueAfter)) {
      if (hasChildren) {
        return { name: key, type: 'nested', children: buildAst(valueBefore, valueAfter, []) };
      }

      return buildNode(key, valueBefore, valueAfter);
    }

    return { name: key, type: 'unchanged', value: valueBefore };
  }, acc);

  return ast;
};

export default (data1, data2) => buildAst(data1, data2, []);
