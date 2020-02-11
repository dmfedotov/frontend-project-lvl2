import valueStringify from './util';

const paddingLeft = '    ';

const renderTree = (diff) => {
  const iter = (node, acc, depth) => node.reduce((inAcc, inNode) => {
    if (inNode.type === 'unchanged') {
      if (inNode.children) {
        return [
          ...inAcc,
          [`${paddingLeft.repeat(depth)}${inNode.name}: {\n${iter(inNode.children, [], depth + 1)}${paddingLeft.repeat(depth)}}\n`],
        ].join('');
      }
      return [...inAcc, [`${paddingLeft.repeat(depth)}${inNode.name}: ${inNode.value}\n`]].join('');
    }

    if (inNode.type === 'added') {
      return [...inAcc, [`${paddingLeft.repeat(depth - 1)}  + ${inNode.name}: ${valueStringify(inNode.valueAfter, depth)}`]].join('');
    }
    if (inNode.type === 'changed') {
      return [
        ...inAcc,
        [`${paddingLeft.repeat(depth - 1)}  - ${inNode.name}: ${valueStringify(inNode.valueBefore, depth)}`],
        [`${paddingLeft.repeat(depth - 1)}  + ${inNode.name}: ${valueStringify(inNode.valueAfter, depth)}`],
      ].join('');
    }
    return [...inAcc, [`${paddingLeft.repeat(depth - 1)}  - ${inNode.name}: ${valueStringify(inNode.valueBefore, depth)}`]].join('');
  }, acc);

  const result = iter(diff, [], 1).trimEnd();
  return `{\n${result}\n}`;
};

export default renderTree;
