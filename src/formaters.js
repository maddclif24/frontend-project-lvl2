import stylishRender from './stylishRender.js';
import plainRender from './plainRender.js';
import jsonRender from './jsonRender.js';

const formatters = {
  default: stylishRender,
  plain: plainRender,
  json: jsonRender,
};

export default (format) => formatters[format];