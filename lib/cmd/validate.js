const { Docker } = require('docker-cli-js');
const _ = require('lodash');
const logger = require('../core/logger');

exports.action = ({ options }) => {
  const { name } = options;

  if (_.isEmpty(name)) {
    logger.warn('`--name` is required');
    return Promise.resolve();
  }

  const docker = new Docker();

  return docker.command(`ps --all --filter "name=${name}"`)
    .then(({ containerList }) => {
      const containerIds = containerList.map((c) => c['container id']);
      logger.info(`Validate: running ${containerIds.length} instances: ${containerIds.join(', ')}`);
    })
    .catch((err) => {
      logger.error('Run: failed => ', err);
    });
};

exports.cancel = (err) => {
  logger.error('ERROR', err);
};
