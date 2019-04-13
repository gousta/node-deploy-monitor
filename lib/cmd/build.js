const logger = require('../core/logger');
const { build } = require('../core/docker');

exports.action = ({ options: { dockerfile, app, name } }) => {
  logger.info('Build started: this process may take some time to complete');

  return build(dockerfile, app, name)
    .then(() => logger.info('Build completed'))
    .catch((err) => logger.error(err));
};
