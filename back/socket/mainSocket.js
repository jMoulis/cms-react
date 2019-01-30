module.exports = io => {
  io.on('connection', async socket => {
    console.log('User Connected');
    io.emit('CONNECT_SUCCESS', {
      socket: socket.id,
    });
  });
};
