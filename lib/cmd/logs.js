const writeFile = require('write');
const moment = require('moment');
const logger = require('../core/logger');
const { getContainerIds, logs } = require('../core/docker');

const generateFileName = (name) => `${name}_${moment().format('YYYYMMDD')}.log`;

exports.action = ({ name }) => {
  const fileName = generateFileName(name);
  return getContainerIds(name)
    .then((containerIds) => {
      if (!containerIds || containerIds.length === 0) {
        logger.log('No containers found');
        return null;
      }

      logger.log('containerIds', containerIds);

      const logsList = containerIds.map((containerId) => logs(containerId));
      return Promise.all(logsList);
    })
    .then((res) => {
      if (res) {
        const allLogs = res.map((l) => l.raw).join();

        return writeFile(fileName, allLogs);
      }

      return null;
    })
    .then((success) => {
      if (success) {
        logger.info(`Logs saved in ${fileName}`);
      }
    })
    .catch((err) => logger.error(err));
};
