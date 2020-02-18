import { isObject } from 'lodash';

const padding = '    ';

const stringify = (value, depth) => {
  if (isObject(value)) {
    const keys = Object.keys(value);
    const newValue = keys.map((key) => `${padding.repeat(depth + 1)}${key}: ${value[key]}\n`).join('');
    return `{\n${newValue}${padding.repeat(depth)}}\n`;
  }

  return `${value}\n`;
};

const renderNode = (node, depth) => {
  const { type } = node;

  const typeToString = {
    nested: `${padding.repeat(depth)}${node.name}: {\n`,
    unchanged: `${padding.repeat(depth)}${node.name}: ${stringify(node.value, depth)}`,
    deleted: `${padding.repeat(depth - 1)}  - ${node.name}: ${stringify(node.valueBefore, depth)}`,
    added: `${padding.repeat(depth - 1)}  + ${node.name}: ${stringify(node.valueAfter, depth)}`,
  };

  if (type === 'changed') {
    return `${typeToString.deleted}${typeToString.added}`;
  }

  return typeToString[type];
};

const renderTree = (diff) => {
  const iter = (node, acc, depth) => node.reduce((inAcc, inNode) => {
    if (inNode.type === 'nested') {
      return [
        ...inAcc,
        `${renderNode(inNode, depth)}${iter(inNode.children, [], depth + 1)}${padding.repeat(depth)}}\n`,
      ].join('');
    }

    return [...inAcc, renderNode(inNode, depth)].join('');
  }, acc);

  const result = iter(diff, [], 1).trimEnd();
  return `{\n${result}\n}`;
};

export default renderTree;
