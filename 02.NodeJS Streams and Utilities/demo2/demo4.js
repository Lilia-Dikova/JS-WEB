const fs = require ('fs');

const writer = fs.createWriteStream('./output.txt');

process.stdin.pipe(writer);

// process.stdin.on('data', (chunk) => {
//     writer.write(chunk.toString());
// });