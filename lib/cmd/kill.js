const logger = require('../core/logger');
const { getContainerIds, rm } = require('../core/docker');

exports.action = ({ name }) => {
  return getContainerIds(name)
    .then((containerIds) => rm(containerIds))
    .then(({ raw }) => logger.log(raw))
    .catch((err) => logger.error(err));
};
