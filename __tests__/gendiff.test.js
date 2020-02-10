import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const result = readFile('result').trim();

test.each([
  ['before.json', 'after.json', result],
  ['before.yml', 'after.yml', result],
  ['before.ini', 'after.ini', result],
])('Comparing %s and %s files', (path1, path2, expected) => {
  expect(gendiff(getFixturePath(path1), getFixturePath(path2))).toBe(expected);
});
