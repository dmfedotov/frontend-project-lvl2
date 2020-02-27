import { isObject } from 'lodash';

const stringify = (value) => (isObject(value) ? '[complex value]' : `'${value}'`);

const typeToString = {
  nested: (name, { children }, render) => render(children, name),
  unchanged: () => '',
  added: (name, { valueAfter }) => `Property '${name.slice(1)}' was added with value: ${stringify(valueAfter)}\n`,
  deleted: (name) => `Property '${name.slice(1)}' was deleted\n`,
  changed: (name, { valueBefore, valueAfter }) => `Property '${name.slice(1)}' was changed from ${stringify(valueBefore)} to ${stringify(valueAfter)}\n`,
};

const renderDiff = (ast, ancestry) => ast.map((node) => {
  const newAncestry = `${ancestry}.${node.name}`;
  const renderNode = typeToString[node.type];

  return renderNode(newAncestry, node, renderDiff);
}).join('');

export default (diff) => `${renderDiff(diff, '').trimEnd()}`;
