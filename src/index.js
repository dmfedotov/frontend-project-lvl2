import path from 'path';
import buildAst from './diff';
import parser from './parsers';
import render from './formatters';

export default (path1, path2, format = 'complex') => {
  const extension = path.extname(path1).slice(1);
  const pathToFile1 = path.resolve(process.cwd(), path1);
  const pathToFile2 = path.resolve(process.cwd(), path2);

  const file1 = parser(extension, pathToFile1);
  const file2 = parser(extension, pathToFile2);
  const diffAst = buildAst(file1, file2);

  return render[format](diffAst);
};
