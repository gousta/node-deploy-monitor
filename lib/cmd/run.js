
const logger = require('../core/logger');
const { run } = require('../core/docker');

exports.action = ({ options: { name, instances } }) => {
  const instancesArray = [];

  for (let i = 0; i < instances; i += 1) {
    instancesArray.push(run(name));
  }

  return Promise
    .all(instancesArray)
    .then((res) => {
      logger.log(`Started ${instances} instances`);
      res.map((r) => logger.log(`- ${r.containerId}`));
    })
    .catch((err) => logger.error(err));
};
