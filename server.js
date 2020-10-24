const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

let tasks = [
  { id: 1, name: 'Shopping' }, 
  { id: 2, name: 'Go out with a dog'}
];

const app = express();
app.use(cors());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

io.on('connection', (socket) => {
    
    socket.emit('updateData', tasks);

    socket.on('addTask', (newTask) => {
      tasks.push(newTask);
      socket.broadcast.emit('addTask', newTask);
    });

    socket.on('removeTask', (removedTask) => {
      tasks.filter(task => {return task.id != removedTask.id})
      socket.broadcast.emit('removeTask', removedTask);
    });

  }); 

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
  });