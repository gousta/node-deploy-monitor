const logger = require('../core/logger');
const { ps, rm } = require('../core/docker');

exports.action = ({ options: { name } }) => {
  return ps(name)
    .then(({ containerList }) => containerList.map((c) => c['container id']))
    .then((containerIds) => rm(containerIds))
    .then(({ raw }) => logger.log(raw))
    .catch((err) => logger.error(err));
};
