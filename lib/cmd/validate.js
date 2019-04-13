const _ = require('lodash');
const logger = require('../core/logger');
const docker = require('../core/docker');

exports.action = ({ options }) => {
  const { name } = options;

  if (_.isEmpty(name)) {
    logger.warn('`--name` is required');
    return Promise.resolve();
  }

  return docker.command(`ps --filter "name=${name}"`)
    .then(({ containerList }) => {
      const containerIds = containerList.map((c) => c['container id']);
      logger.info(`Validate: running ${containerIds.length} instances [${containerIds.join(', ')}]`);
    })
    .catch((err) => {
      logger.error('Run: failed => ', err);
    });
};

exports.cancel = (err) => {
  logger.error('ERROR', err);
};
