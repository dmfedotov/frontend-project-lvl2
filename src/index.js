import path from 'path';
import _ from 'lodash';
import parser from './parsers';


export default (path1, path2) => {
  const extension = path.extname(path1).slice(1);
  const file1 = parser(extension)(path1);
  const file2 = parser(extension)(path2);

  const secondFileNewKeys = _.difference(Object.keys(file2), Object.keys(file1));

  const diffArray = Object.entries(file1).reduce((acc, [key, value]) => {
    if (_.has(file2, key)) {
      if (value === file2[key]) {
        return [...acc, [`    ${key}: ${value}`]];
      }
      return [
        ...acc,
        [`  + ${key}: ${file2[key]}`],
        [`  - ${key}: ${value}`],
      ];
    }

    return [...acc, [`  - ${key}: ${value}`]];
  }, []);

  const newValues = secondFileNewKeys.map((key) => `  + ${key}: ${file2[key]}`);
  const resultDiffArray = diffArray.concat(newValues);
  const resultDiffString = resultDiffArray.join('\n');

  return `{\n${resultDiffString}\n}`;
};
