import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Comparing files in different formats', () => {
  const complex = readFile('complex').trim();
  const plain = readFile('plain').trim();
  const json = readFile('json').trim();

  test.each([
    ['before.json', 'after.json', 'complex', complex],
    ['before.yml', 'after.yml', 'complex', complex],
    ['before.ini', 'after.ini', 'complex', complex],
    ['before.json', 'after.json', 'plain', plain],
    ['before.yml', 'after.yml', 'plain', plain],
    ['before.ini', 'after.ini', 'plain', plain],
    ['before.json', 'after.json', 'json', json],
    ['before.yml', 'after.yml', 'json', json],
    ['before.ini', 'after.ini', 'json', json],
  ])('%s and %s in %s format', (file1, file2, format, expected) => {
    expect(gendiff(getFixturePath(file1), getFixturePath(file2), format)).toBe(expected);
  });
});
