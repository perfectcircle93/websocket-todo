const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

let tasks = ['Shopping', 'Go out with a dog'];

const app = express();
app.use(cors());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client.');
    socket.emit('updateData', tasks);
    console.log('Upated local list');

    socket.on('addTask', (newTask) => {
      tasks.push(newTask);
      socket.broadcast.emit('addTask', newTask);
    });

    socket.on('removeTask', (idTask) => {
      tasks.splice(idTask);
      socket.broadcast.emit('removeTask', idTask);
    });

  }); 

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
  });