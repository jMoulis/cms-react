const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const SocketIO = require('socket.io');
const http = require('http');
const routes = require('./routes/main');
const mainSocket = require('./socket/mainSocket');
const ApiResponse = require('./services/ApiResponse');

const app = express();

const server = http.createServer(app);
const io = new SocketIO(server);
mainSocket(io);

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect('mongodb://localhost/cms', { useNewUrlParser: true })
    .catch(error => console.warn(error));
  mongoose.connection.on('error', error =>
    console.warn('Warning', error.message),
  );
}

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

routes(app);

app.use((err, req, res, next) => {
  const apiResponse = new ApiResponse(res);
  return apiResponse.failure(422, null, err.message);
});

server.listen(3050, () => {
  console.log('Running on port 3050');
});
