import fs from 'fs';
import path from 'path';
import buildDiff from './diff';
import parse from './parsers';
import render from './formatters';

export default (path1, path2, format = 'complex') => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), path1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(process.cwd(), path2), 'utf-8');
  const extension = path.extname(path1).slice(1);

  const data1 = parse(extension, file1);
  const data2 = parse(extension, file2);
  const diff = buildDiff(data1, data2);

  return render[format](diff);
};
