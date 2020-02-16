import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Comparing files in complex format', () => {
  const complex = readFile('complex').trim();

  test.each([
    ['before.json', 'after.json', complex],
    ['before.yml', 'after.yml', complex],
    ['before.ini', 'after.ini', complex],
  ])('%s and %s', (path1, path2, expected) => {
    expect(gendiff(getFixturePath(path1), getFixturePath(path2))).toBe(expected);
  });
});


describe('Comparing files in plain format', () => {
  const plain = readFile('plain').trim();

  test.each([
    ['before.json', 'after.json', 'plain', plain],
    ['before.yml', 'after.yml', 'plain', plain],
    ['before.ini', 'after.ini', 'plain', plain],
  ])('%s and %s', (path1, path2, format, expected) => {
    expect(gendiff(getFixturePath(path1), getFixturePath(path2), format)).toBe(expected);
  });
});

describe('Comparing files in JSON format', () => {
  const json = readFile('json').trim();

  test.each([
    ['before.json', 'after.json', 'json', json],
    ['before.yml', 'after.yml', 'json', json],
    ['before.ini', 'after.ini', 'json', json],
  ])('%s and %s', (path1, path2, format, expected) => {
    expect(gendiff(getFixturePath(path1), getFixturePath(path2), format)).toBe(expected);
  });
});
