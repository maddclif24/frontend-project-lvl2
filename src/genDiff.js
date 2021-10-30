import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const getFileExtension = (filepath) => path.extname(filepath).substr(1);

const parse = (file, format) => {
  const parsers = {
    json: JSON.parse,
  };
  return parsers[format](file);
};

export default (filepath1, filepath2, format = 'json') => {
  const file1 = parse(readFileSync(filepath1, 'utf-8'), getFileExtension(filepath1));
  const file2 = parse(readFileSync(filepath2, 'utf-8'), getFileExtension(filepath2));
  const uniqKeys = _.uniq([..._.keys(file1), ..._.keys(file2)]).sort();
  const diff = uniqKeys.map((key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] !== file2[key]) {
        return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
      }
      return `    ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return `  + ${key}: ${file2[key]}`;
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return `  - ${key}: ${file1[key]}`;
    }
    return format;
  });
  return ['{', ...diff, '}'].join('\n');
};
