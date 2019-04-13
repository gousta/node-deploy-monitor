const logger = require('../core/logger');
const docker = require('../core/docker');

exports.action = ({ options: { name } }) => {
  return docker.command(`ps --filter "name=${name}"`)
    .then(({ containerList }) => {
      const containerIds = containerList.map((c) => c['container id']);

      return docker.command(`rm -f ${containerIds.join(' ')}`);
    })
    .then(({ raw }) => logger.log(raw))
    .catch((err) => logger.error(err));
};
