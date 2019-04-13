const logger = require('../core/logger');
const { ps } = require('../core/docker');

exports.action = ({ options: { name } }) => {
  return ps(name)
    .then(({ containerList }) => containerList.map((c) => c['container id']))
    .then((containerIds) => logger.info(`${containerIds.length} instances running [${containerIds.join(', ')}]`))
    .catch((err) => logger.error(err));
};
