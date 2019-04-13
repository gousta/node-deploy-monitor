const shortid = require('shortid');
const logger = require('../core/logger');
const docker = require('../core/docker');

exports.action = ({ options }) => {
  const { name, instances } = options;

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
