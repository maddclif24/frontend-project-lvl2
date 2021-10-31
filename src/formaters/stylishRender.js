import _ from 'lodash';

const ident = '    ';

const stringify = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.sortBy(_.keys(value));
  const result = keys.map((key) => {
    const string = `    ${key}: ${stringify(value[key], deep + 1)}`;
    return `${ident.repeat(deep)}${string}`;
  });

  return `{\n${result.join('\n')}\n${ident.repeat(deep)}}`;
};

export default (ast) => {
  const iter = (tree, offset) => {
    const getString = {
      unchanged: (node, deep) => `    ${node.name}: ${stringify(node.value, deep + 1)}`,
      added: (node, deep) => `  + ${node.name}: ${stringify(node.value, deep + 1)}`,
      deleted: (node, deep) => `  - ${node.name}: ${stringify(node.value, deep + 1)}`,
      updated: (node, deep) => `  - ${node.name}: ${stringify(node.oldValue, deep + 1)}\n`
        + `${ident.repeat(deep)}  + ${node.name}: ${stringify(node.newValue, deep + 1)}`,
      nested: (node, deep) => `    ${node.name}: ${iter(node.children, deep + 1)}`,
    };
    const result = tree.map((node) => `${ident.repeat(offset)}${getString[node.status](node, offset)}`);

    return ['{', ...result, `${ident.repeat(offset)}}`].join('\n');
  };
  return iter(ast, 0);
};
