import stylishRender from './stylishRender.js';
import plainRender from './plainRender.js';

const formatters = {
  default: stylishRender,
  plain: plainRender,
};

export default (format) => formatters[format];