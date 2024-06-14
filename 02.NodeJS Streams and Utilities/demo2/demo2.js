const fs = require ('fs');

const data = [1,2,3];

fs.writeFile('./data.json', JSON.stringify(data), (err) => {
    console.log('Write completed');

});
console.log('Code completed');




//fs.writeFileSync('./data.json', JSON.stringify(data));





// fs.readFile('./demo.html', (err, data) => {
//     if (err != null) {
//         console.log('Error encountered:', err.message);
//         return;
//     }

//     console.log(data.toString());
// });