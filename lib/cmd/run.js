//
const execa = require('execa');
const _ = require('lodash');
const logger = require('../core/logger');

exports.action = ({ options }) => {
  const { name, instances } = options;

  if (_.isEmpty(name)) {
    logger.warn('`--name` is required');
    return Promise.resolve();
  }

  if (!_.isNumber(instances) || instances === 0) {
    logger.warn('`--instances` is required and must be a number');
    return Promise.resolve();
  }

  const instancesArray = [];

  for (let i = 0; i < instances; i += 1) {
    instancesArray.push(execa.shell(`docker run --detach -it --rm --name ${name + i} ${name}`));
  }

  return Promise
    .all(instancesArray)
    .then((res) => {
      logger.log(`Run: started ${instances} instances`);
      res.map((r) => logger.log(r.stdout.toString()));
    })
    .catch((err) => {
      logger.error('Run: failed => ', err);
    });
};

exports.cancel = (err) => {
  logger.error('ERROR', err);
};
