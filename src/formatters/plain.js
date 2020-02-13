const getValue = (value) => (value instanceof Object ? '[complex value]' : `'${value}'`);

const buildNode = (name, type, ...values) => {
  if (type === 'added') {
    const [value] = values;
    return `Property '${name}' was added with value: ${getValue(value)}`;
  }
  if (type === 'changed') {
    const [valueBefore, valueAfter] = values;
    return `Property '${name}' was changed from ${getValue(valueBefore)} to ${getValue(valueAfter)}`;
  }

  return `Property '${name}' was deleted`;
};

const render = (ast) => {
  const iter = (node, acc, ancestry) => node.reduce((inAcc, inNode) => {
    const { name, type } = inNode;
    const newAncestry = `${ancestry}.${name}`;

    if (inNode.children) {
      return [...inAcc, [iter(inNode.children, [], `${newAncestry}`)]].join('');
    }
    if (inNode.type === 'unchanged') {
      return inAcc;
    }
    if (type === 'added' || type === 'deleted') {
      return [...inAcc, [`${buildNode(newAncestry.slice(1), type, inNode.valueAfter)}\n`]].join('');
    }

    return [...inAcc, [`${buildNode(newAncestry.slice(1), type, inNode.valueBefore, inNode.valueAfter)}\n`]].join('');
  }, acc);

  return iter(ast, [], '').trimEnd();
};

export default render;
