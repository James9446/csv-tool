'use strict'
const fs = require('fs');

const parseCSV = (fileName) => {
  const path = `./data/${fileName}.csv`;
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.error('Error: ', err);
      return;
    };
    var dataArray = data.split(/\r?\n/);
    let rows = dataArray.map(item => {
      return item.split(',');
    });
    const columns = rows[0];
    rows = rows.slice(1);
    let structuredData = [];
    for (let i = 0; i < rows.length; i++) {
      structuredData.push(structureData(columns, rows[i]));
    }
    saveFile(structuredData, `./json/archive/${fileName}.json`);
    console.log(`Parsed ${fileName}.csv`);
    loadFile(fileName);
  });
};

const fetchFile = (path='./json/stack.json') => {
  try {
    return JSON.parse(fs.readFileSync(path));
  } catch (err) {
    console.error('Error: ', err);
    return;
  }
};

const saveFile = (stack, path='./json/stack.json') => {
  try {
    fs.writeFileSync(path, JSON.stringify(stack));
  } catch (err) {
    console.error('Error: ', err);
  }
};

const printFile = (row) => {
  try {
    const file = fetchFile();
    if (!isNaN(row)) {
      if (row < 0 || row >= file.length) {
        return console.error(`${row} is not a valid row number`);
      } else {
        console.log(`Row: ${row}`);
        return console.log(JSON.stringify(file[row], null, 2));
      }
    }
    console.log(JSON.stringify(file, null, 2));
  } catch (err) {
    console.error('Error: ', err);
  }
};

const displayTable = () => {
  try {
    let stack = fetchFile();
    console.table(stack, Object.keys(stack[0])); 
  } catch (err) {
    console.error('Error: ', err);
  }
};

const structureData = (keys, values) => {
  if (keys.length !== values.length) {
    throw new Error('Keys lenght must match values length');
    return;
  };
  let structuredData = {};
  for (let i = 0; i < values.length; i++) {
    structuredData[keys[i]] = values[i];
  }
  return structuredData;
};

const clearStack = () => {
    saveFile([])
};

const archiveStack = (name) => {
    let stack = fetchFile();
    saveFile(stack, `./json/archive/${name}.json`);
};

const loadFile = (name) => {
  let stack = fetchFile(`./json/archive/${name}.json`);
  if (!stack) {
    console.error(`File "${name}" was not found`);
    return;
  }
  console.log(`Loaded ${name}`);
  saveFile(stack);
};

const listFiles = () => {
  try {
    let list = './json/archive/'
    fs.readdirSync(list).forEach(file => {
      console.log(file.split('.json')[0]);
    })
  } catch (err) {
    console.error('Error: ', err);
  }
};

module.exports = {
  parseCSV,
  printFile,
  displayTable,
  clearStack,
  archiveStack,
  loadFile,
  listFiles
}