import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

export default (file) => path.resolve(dirName, '..', '__fixtures__', file);
