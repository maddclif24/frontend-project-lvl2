#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2, program.format)))
  .parse(process.argv);
