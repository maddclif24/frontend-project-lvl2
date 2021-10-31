import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const getPath = (path) => path.join('.');

export default (ast) => {
  const iter = (tree, pathToProperty) => {
    const getString = {
      unchanged: () => null,
      added: (node, fullPath) => `Property '${getPath(fullPath)}' was added with value: ${stringify(node.value)}`,
      deleted: (node, fullPath) => `Property '${getPath(fullPath)}' was removed`,
      updated: (node, fullPath) => (
        `Property '${getPath(fullPath)}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
      ),
      nested: (node, fullPath) => `${iter(node.children, fullPath)}`,
    };

    const result = tree.map((node) => {
      const fullPath = [...pathToProperty, node.name];

      return getString[node.status](node, fullPath);
    });

    return result.filter((string) => string !== null).join('\n');
  };

  return iter(ast, []);
};
