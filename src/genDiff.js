import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parse from './parse.js';
import render from './formaters.js';

const getFileExtension = (filepath) => path.extname(filepath).substr(1);

const isNested = (value1, value2) => _.isObject(value1) && _.isObject(value2);

const buildAST = (object1, object2) => {
  const uniqKeys = _.uniq([..._.keys(object1), ..._.keys(object2)]).sort();
  return uniqKeys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (_.has(object1, key) && _.has(object2, key)) {
      if (value1 === value2) {
        return { name: key, status: 'unchanged', value: value1 };
      }
      if (isNested(value1, value2)) {
        return { name: key, status: 'nested', children: buildAST(value1, value2) };
      }
      if (value1 !== value2) {
        return {
          name: key, status: 'updated', oldValue: value1, newValue: value2,
        };
      }
    }
    if (!_.has(object1, key) && _.has(object2, key)) {
      return { name: key, status: 'added', value: value2 };
    }
    return { name: key, status: 'deleted', value: value1 };
  });
};

export default (filepath1, filepath2, format) => {
  const file1 = parse(readFileSync(filepath1, 'utf-8'), getFileExtension(filepath1));
  const file2 = parse(readFileSync(filepath2, 'utf-8'), getFileExtension(filepath2));
  const ast = buildAST(file1, file2);
  console.log(format);
  return render(format)(ast);
};
