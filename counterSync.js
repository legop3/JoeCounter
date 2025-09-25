import fs from 'fs';
import { io } from './index.js';

// read counter as integer from counter.txt
const counter = parseInt(fs.readFileSync('counter.txt', 'utf8'));
console.log(`Counter is ${counter} on startup`);

// global count variable
var count = counter;

// write to counter file every 5 seconds
setInterval(() => {
  fs.writeFileSync('counter.txt', count.toString());
  console.log(`Counter is ${count} and written to file`);
}, 5000);

// functions to increment and decrement count
function increment() {
    count++;
    io.emit('countUpdated', count);
}

function decrement() {
    count--;
    io.emit('countUpdated', count);
}

export { count, increment, decrement };