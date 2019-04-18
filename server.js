const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const logger = require('./lib/core/logger.js');
const { name, version } = require('./package.json');
const { discover } = require('./lib/core/docker');

const app = express();

app.use(cors());
app.use((req, res, next) => {
  logger.info(`[D&M][HTTP][${req.method}] ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => res.json({ name, version }));
app.get('/images', (req, res) => {
  discover().then(({ containerList }) => {
    const images = _.uniq(containerList.map((c) => c.image));
    res.json({ data: images });
  });
});

app.get('/images/{image}', (req, res) => {
  res.json({
    data: {
      images: ['dm'],
    },
  });
});

module.exports = app.listen(5555, () => {
  logger.info('[D&M][HTTP] STARTED: 5555');
});
