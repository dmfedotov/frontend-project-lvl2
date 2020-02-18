import { isObject } from 'lodash';

const stringify = (value) => (isObject(value) ? '[complex value]' : `'${value}'`);

const renderNode = (node, name) => {
  const { type } = node;

  const typeToValue = {
    added: `Property '${name}' was added with value: ${stringify(node.valueAfter)}`,
    deleted: `Property '${name}' was deleted`,
    changed: `Property '${name}' was changed from ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`,
  };

  return typeToValue[type];
};

const renderDiff = (ast) => {
  const iter = (node, acc, ancestry) => node.reduce((inAcc, inNode) => {
    const { name } = inNode;
    const newAncestry = `${ancestry}.${name}`;

    if (inNode.children) {
      return [...inAcc, iter(inNode.children, [], `${newAncestry}`)].join('');
    }
    if (inNode.type === 'unchanged') {
      return inAcc;
    }

    return [...inAcc, `${renderNode(inNode, newAncestry.slice(1))}\n`].join('');
  }, acc);

  return iter(ast, [], '').trimEnd();
};

export default renderDiff;
