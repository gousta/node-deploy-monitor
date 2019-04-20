const logger = require('../core/logger');
const { getContainerIds, containersKill } = require('../core/docker');

exports.action = ({ name }) => {
  return getContainerIds(name)
    .then((containerIds) => containersKill(containerIds))
    .then(({ raw }) => logger.log(raw))
    .catch((err) => logger.error(err));
};
