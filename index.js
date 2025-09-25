import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import { count, decrement, increment } from './counterSync.js';
import './discordBot.js';

// GLOBAL CONFIG VARIABLES


const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, 'public')));

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('countUpdated', count);


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('increment', () => {
    increment();
    io.emit('countUpdated', count);
  });

  socket.on('decrement', () => {
    decrement();
    io.emit('countUpdated', count);
  });

});

export { io };