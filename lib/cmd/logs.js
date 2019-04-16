const writeFile = require('write');
const moment = require('moment');
const logger = require('../core/logger');
const { getContainerIds, logs } = require('../core/docker');

const generateFileName = (name) => `logs_${name}_${moment().format('YYYY_MM_DD_HH_mm')}.log`;

exports.action = ({ name }) => {
  const fileName = generateFileName(name);
  return getContainerIds(name)
    .then((containerIds) => {
      const logsList = containerIds.map((containerId) => logs(containerId));

      return Promise.all(logsList);
    })
    .then((res) => {
      const allLogs = res.map((l) => l.raw).join();
      // console.log('allLogs', allLogs);

      return writeFile(fileName, allLogs);
    })
    .then(() => logger.info(`Logs saved in ${fileName}`))
    .catch((err) => logger.error(err));
};
