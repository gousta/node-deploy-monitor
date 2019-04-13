const logger = require('../core/logger');
const docker = require('../core/docker');

exports.action = ({ options }) => {
  const { dockerfile, app, name } = options;

  logger.info('Build started: this process may take some time to complete');

  return docker.command(`build -t ${name} -f ${dockerfile} ${app}`)
    .then(() => {
      logger.info('Build completed');
    })
    .catch((err) => {
      logger.error('Build failed:', err);
    });
};
