import { program } from 'commander/esm.mjs';
import genDiff from '../src/genDiff.js';

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2, program.opts().format)))
    .parse(process.argv);

export default () => program;
