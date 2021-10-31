import yaml from 'js-yaml';

export default (file, format) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  };
  return parsers[format](file);
};
