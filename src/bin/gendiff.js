#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((pathToFile1, pathToFile2) => {
    console.log(genDiff(pathToFile1, pathToFile2));
  });

program.parse(process.argv);
