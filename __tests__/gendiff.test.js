import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';
import getPath from '../src/getPath.js';

test('stylish diff json', () => {
  const filepath1 = getPath('file1.json');
  const filepath2 = getPath('file2.json');
  const result = readFileSync(getPath('result.txt'), 'utf-8');
  expect(genDiff(filepath1, filepath2, 'default')).toEqual(result);
});

test('stylish diff yml', () => {
  const filepath1 = getPath('file1.yml');
  const filepath2 = getPath('file2.yml');
  const result = readFileSync(getPath('result.txt'), 'utf-8');
  expect(genDiff(filepath1, filepath2, 'default')).toEqual(result);
});

test('plain diff json', () => {
  const filepath1 = getPath('file1.json');
  const filepath2 = getPath('file2.json');
  const result = readFileSync(getPath('resultPlain.txt'), 'utf-8');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(result);
});

test('plain diff yml', () => {
  const filepath1 = getPath('file1.yml');
  const filepath2 = getPath('file2.yml');
  const result = readFileSync(getPath('resultPlain.txt'), 'utf-8');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(result);
});
