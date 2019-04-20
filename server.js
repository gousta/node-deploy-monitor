const _ = require('lodash');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const logger = require('./lib/core/logger.js');
const { name, version } = require('./package.json');
const { images, ps } = require('./lib/core/docker');

app.use(cors());
app.use((req, res, next) => {
  logger.info(`[D&M][HTTP][${req.method}] ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => res.json({ name, version }));
app.get('/images', (req, res) => {
  images().then(({ containerList }) => {
    if (containerList && containerList.length > 0) {
      const imageList = _.uniq(containerList.map((c) => c.image));
      res.json({ data: imageList });
    } else {
      res.json({ data: [] });
    }
  });
});

app.get('/images/:image', (req, res) => {
  ps(req.params.image).then(({ containerList }) => {
    res.json({ data: containerList });
  });
});

server.listen(5555);

io.on('connection', (socket) => {
  logger.log('connection'); // Let's log

  socket.emit('message-to-client', { hello: 'world' }); // TRANSMIT DATA

  socket.on('message-to-server', (data) => { // ACCEPT DATA
    logger.log(data);
  });
});
