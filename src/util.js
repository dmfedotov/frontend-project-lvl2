const paddingLeft = '    ';

const valueStringify = (value, depth) => {
  if (value instanceof Object) {
    const keys = Object.keys(value);
    const arr = keys.map((key) => [`${paddingLeft.repeat(depth + 1)}${key}: ${value[key]}\n`]).join('');
    return `{\n${arr}${paddingLeft.repeat(depth)}}\n`;
  }

  return `${value}\n`;
};

export default valueStringify;
