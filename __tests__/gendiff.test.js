import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const path1 = getFixturePath('before.json');
const path2 = getFixturePath('after.json');
const result = readFile('result.txt').trim();

test('Comparing two JSON files', () => {
  expect(gendiff(path1, path2)).toBe(result);
});
