const _ = require('lodash');
const shortid = require('shortid');
const logger = require('../core/logger');
const docker = require('../core/docker');

exports.action = ({ options }) => {
  const { name, instances } = options;

  if (_.isEmpty(name)) {
    logger.warn('`--name` is required');
    return Promise.resolve();
  }

  if (!_.isNumber(instances) || instances <= 0) {
    logger.warn('`--instances` is required and must be a number');
    return Promise.resolve();
  }

  const instancesArray = [];

  for (let i = 0; i < instances; i += 1) {
    instancesArray.push(docker.command(`run --detach -it --rm --name ${name}${shortid.generate()} ${name}`));
  }

  return Promise
    .all(instancesArray)
    .then((res) => {
      logger.log(`Started ${instances} instances`);
      res.map((r) => logger.log(`- ${r.containerId}`));
    })
    .catch((err) => {
      logger.error(err);
      logger.error('One or more instances could not start');
    });
};

exports.cancel = (err) => {
  logger.error('ERROR:', err);
};
