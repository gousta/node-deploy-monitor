const _ = require('lodash');
const logger = require('../core/logger');
const docker = require('../core/docker');

exports.action = ({ options }) => {
  const { dockerfile, app, name } = options;

  if (_.isEmpty(dockerfile)) {
    logger.warn('`--dockerfile /path/to/dockerfile` is required');
    return Promise.resolve();
  }

  if (_.isEmpty(app)) {
    logger.warn('`--app /path/to/application` is required');
    return Promise.resolve();
  }

  if (_.isEmpty(name)) {
    logger.warn('`--name my-app-name` is required');
    return Promise.resolve();
  }

  logger.info('Build: started - this process may take some time depending on your internet speed');

  return docker.command(`build -t ${name} -f ${dockerfile} ${app}`)
    .then(() => {
      logger.info('Build completed');
    })
    .catch((err) => {
      logger.error('Build failed:', err);
    });
};

exports.cancel = (err) => {
  logger.error('ERROR:', err);
};
