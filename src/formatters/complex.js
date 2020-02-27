import { isObject } from 'lodash';

const padding = '    ';

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }

  const keys = Object.keys(value);
  const newValue = keys.map((key) => `${padding.repeat(depth + 1)}${key}: ${value[key]}`).join('\n');
  return `{\n${newValue}\n${padding.repeat(depth)}}`;
};

const typeToString = {
  nested: ({ name, children }, depth, render) => (
    `${padding.repeat(depth)}${name}: {\n${render(children, depth + 1)}\n${padding.repeat(depth)}}`
  ),
  unchanged: ({ name, value }, depth) => `${padding.repeat(depth)}${name}: ${stringify(value, depth)}`,
  deleted: ({ name, valueBefore }, depth) => `${padding.repeat(depth - 1)}  - ${name}: ${stringify(valueBefore, depth)}`,
  added: ({ name, valueAfter }, depth) => `${padding.repeat(depth - 1)}  + ${name}: ${stringify(valueAfter, depth)}`,
  changed: ({ name, valueBefore, valueAfter }, depth) => (
    `${padding.repeat(depth - 1)}  - ${name}: ${stringify(valueBefore, depth)}\n${padding.repeat(depth - 1)}  + ${name}: ${stringify(valueAfter, depth)}`
  ),
};

const renderDiff = (ast, depth) => ast.map((node) => {
  const renderNode = typeToString[node.type];
  return renderNode(node, depth, renderDiff);
}).join('\n');

export default (diff) => `{\n${renderDiff(diff, 1)}\n}`;
