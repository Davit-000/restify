const fs = require('fs');
const path = require('path');

// console.log(global.process);
//
console.log(path.resolve(__dirname, '../../'));

// console.log(path.dirname(require.main.filename));


// const filePath = '../';
//
// fs.access('restify.config.js', fs.constants.F_OK | fs.constants.W_OK, (err) => {
//   if (err) {
//     console.error(
//       `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
//   } else {
//     console.log(`${file} exists, and it is writable`);
//   }
// });