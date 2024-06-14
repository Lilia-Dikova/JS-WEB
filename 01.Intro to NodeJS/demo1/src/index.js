const {print: MyPrint, add} = require('./util');
const fs = require('fs');
const xlsx = require ('xlsx');

MyPrint('Hello JS Backend! ' + add(3,3));

fs.writeFileSync('./output.txt', 'Hello world!');