const logger = require('../core/logger');
const { ps, stats } = require('../core/docker');

exports.action = ({ options: { name } }) => {
  return ps(name)
    .then(({ containerList }) => containerList.map((c) => c['container id']))
    .then((containerIds) => stats(containerIds))
    .then(({ raw }) => logger.log(raw))
    .catch((err) => logger.error(err));
};
