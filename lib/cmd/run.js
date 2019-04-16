
const logger = require('../core/logger');
const { run } = require('../core/docker');

exports.action = ({ name, options: { instances = 1 } }) => {
  if (instances > 10) {
    logger.warn('Not that many at once... I can do up to 10 at once.');
    return Promise.resolve();
  }

  const machines = Array.from(Array(instances)).map(() => run(name));

  return Promise
    .all(machines)
    .then((res) => {
      logger.log(`Started ${instances} instances`);
      res.map((r) => logger.log(`- ${r.containerId}`));
    })
    .catch((err) => logger.error(err));
};
