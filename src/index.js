import fs from 'fs';
import path from 'path';
import buildDiff from './diff';
import parse from './parsers';
import render from './formatters';

export default (path1, path2, format = 'complex') => {
  const data1 = fs.readFileSync(path.resolve(process.cwd(), path1), 'utf-8');
  const data2 = fs.readFileSync(path.resolve(process.cwd(), path2), 'utf-8');
  const type = path.extname(path1).slice(1);

  const parsedData1 = parse(type, data1);
  const parsedData2 = parse(type, data2);
  const diff = buildDiff(parsedData1, parsedData2);

  return render(format, diff);
};
