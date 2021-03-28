const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const lib = require('./lib.js');

const nameOptions = {
  describe: 'The name of the file',
  demand: true,
  alias: 'n'
};

const printOptions = {
  describe: 'Specify a specific row to print',
  demand: false,
  type: 'number',
  alias: 'r'
};

const argv = yargs
  .command('parse', 'Parse a CSV file from "/data" folder into JSON and save it under "/archive/json" \n Parse requires a name argument. Use the -n flag', {
    name: nameOptions
  })
  .command('clear', 'Clear the stack')
  .command('print', 'Print the currently loaded file from "/json/stack.json" \n Print has an option row argument to print a specific row. Use the -r flag', {
    row: printOptions
  })
  .command('list', 'Print a list of archived files')
  .command('save', 'Save your file (work in progess). \n Save requires a name argument. Use the -n flag', {
    name: nameOptions
  })
  .command('load', 'Load a saved file from "/json/archive". \n Load requires a name argument. Use the -n flag', {
    name: nameOptions
  })
  .help()
  .argv;

let command = argv._[0];

if (command === 'parse') {
  lib.parseCSV(argv.name);
} else if (command === 'clear') {
  lib.clearStack();
} else if (command === 'save') {
  lib.archiveStack(argv.name);
} else if (command === 'load') {
  lib.loadFile(argv.name);
} else if (command === 'list') {
  lib.listFiles();
} else if (command === 'print') {
  lib.printFile(argv.row);
} else if (command === 'display') {
  lib.displayTable();
} else {
  lib.displayTable();
};
