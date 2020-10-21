const express = require('express');
const socket = require('socket.io');

let tasks = [];

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});



const io = socket(server);

io.on('connection', () => {
    socket.emit('updateData', tasks);
    socket.on('addTask', (newTask) => {
      tasks.push(newTask);
      socket.broadcast.emit('addTask', newTask);
    });
    socket.on('removeTask', (idTask) => {
      tasks.splice(idTask);
      socket.broadcast.emit('removeTask', idTask);
    });
  }); 