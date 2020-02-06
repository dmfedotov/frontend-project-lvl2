import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const result = readFile('result.txt').trim();

test('Comparing two JSON files', () => {
  const path1 = getFixturePath('before.json');
  const path2 = getFixturePath('after.json');
  expect(gendiff(path1, path2)).toBe(result);
});

test('Comparing two yaml files', () => {
  const path1 = getFixturePath('before.yml');
  const path2 = getFixturePath('after.yml');
  expect(gendiff(path1, path2)).toBe(result);
});
