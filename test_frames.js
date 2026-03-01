const fs = require('fs');
const buffer = fs.readFileSync('fox/frame_0025.gif');
console.log(buffer.length);
