import { isObject } from 'lodash';

const padding = '    ';

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return `${value}\n`;
  }

  const keys = Object.keys(value);
  const newValue = keys.map((key) => `${padding.repeat(depth + 1)}${key}: ${value[key]}\n`).join('');
  return `{\n${newValue}${padding.repeat(depth)}}\n`;
};

const renderNode = (node, depth) => {
  const { type } = node;

  const typeToValue = {
    nested: `${padding.repeat(depth)}${node.name}: {\n`,
    unchanged: `${padding.repeat(depth)}${node.name}: ${stringify(node.value, depth)}`,
    deleted: `${padding.repeat(depth - 1)}  - ${node.name}: ${stringify(node.valueBefore, depth)}`,
    added: `${padding.repeat(depth - 1)}  + ${node.name}: ${stringify(node.valueAfter, depth)}`,
  };

  if (type === 'changed') {
    return `${typeToValue.deleted}${typeToValue.added}`;
  }

  return typeToValue[type];
};

const renderDiff = (ast) => {
  const iter = (node, acc, depth) => node.reduce((inAcc, inNode) => {
    if (inNode.type === 'nested') {
      return [
        ...inAcc,
        `${renderNode(inNode, depth)}${iter(inNode.children, [], depth + 1)}${padding.repeat(depth)}}\n`,
      ].join('');
    }

    return [...inAcc, renderNode(inNode, depth)].join('');
  }, acc);

  const result = iter(ast, [], 1).trimEnd();
  return `{\n${result}\n}`;
};

export default renderDiff;
