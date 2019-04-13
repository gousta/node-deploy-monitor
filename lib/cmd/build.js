const logger = require('../core/logger');
const docker = require('../core/docker');

exports.action = ({ options: { dockerfile, app, name } }) => {
  logger.info('Build started: this process may take some time to complete');

  return docker
    .command(`build -t ${name} -f ${dockerfile} ${app}`)
    .then(() => {
      logger.info('Build completed');
    })
    .catch((err) => logger.error(err));
};
