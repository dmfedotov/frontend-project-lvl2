import { union, isEqual } from 'lodash';

const iter = (data1, data2, acc) => {
  const uniqKeys = union(Object.keys(data1), Object.keys(data2)).sort();

  return uniqKeys.reduce((innerAcc, key) => {
    const valueBefore = data1[key];
    const valueAfter = data2[key];
    const hasChildren = valueBefore instanceof Object && valueAfter instanceof Object;

    if (!isEqual(valueBefore, valueAfter)) {
      if (hasChildren) {
        return [...innerAcc,
          {
            name: key,
            type: 'unchanged',
            children: iter(valueBefore, valueAfter, []),
          },
        ];
      }
      if (typeof valueBefore === 'undefined' && typeof valueAfter !== 'undefined') {
        return [...innerAcc, { name: key, type: 'added', valueAfter }];
      }
      if (typeof valueBefore !== 'undefined' && typeof valueAfter === 'undefined') {
        return [...innerAcc, { name: key, type: 'deleted', valueBefore }];
      }
      return [...innerAcc, {
        name: key, type: 'changed', valueBefore, valueAfter,
      }];
    }

    return [...innerAcc, { name: key, type: 'unchanged', value: valueBefore }];
  }, acc);
};

export default (data1, data2) => iter(data1, data2, []);
