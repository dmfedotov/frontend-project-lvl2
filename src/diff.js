import {
  union, isEqual, isObject, has,
} from 'lodash';

const nodes = [
  {
    check: (data1, data2, key) => (isObject(data1[key]) && isObject(data2[key])),
    buildNode: (name, valueBefore, valueAfter, func) => (
      { name, type: 'nested', children: func(valueBefore, valueAfter) }
    ),
  },
  {
    check: (data1, data2, key) => isEqual(data1[key], data2[key]),
    buildNode: (name, valueBefore, _valueAfter) => ({ name, type: 'unchanged', value: valueBefore }),
  },
  {
    check: (data1, data2, key) => (!has(data1, key) && has(data2, key)),
    buildNode: (name, _valueBefore, valueAfter) => ({ name, type: 'added', valueAfter }),
  },
  {
    check: (data1, data2, key) => (has(data1, key) && !has(data2, key)),
    buildNode: (name, valueBefore, _valueAfter) => ({ name, type: 'deleted', valueBefore }),
  },
  {
    check: (data1, data2, key) => !isEqual(data1[key], data2[key]),
    buildNode: (name, valueBefore, valueAfter) => ({
      name, type: 'changed', valueBefore, valueAfter,
    }),
  },
];

const buildAst = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2)).sort();

  const ast = keys.map((key) => {
    const { buildNode } = nodes.find(({ check }) => check(data1, data2, key));
    return buildNode(key, data1[key], data2[key], buildAst);
  });

  return ast;
};

export default (data1, data2) => buildAst(data1, data2);
