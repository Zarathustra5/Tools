let fs = require('fs');

let file = fs.createWriteStream('0-9-8.dict');
file.on('error', function(err) { /* error handling */ });
for (let i = 0; i < 100000000; i++) {
  file.write(String(i).padStart(8, '0') + '\n');
}
file.end();
