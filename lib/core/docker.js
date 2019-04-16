/* eslint-disable implicit-arrow-linebreak */
const { Docker } = require('docker-cli-js');
const shortid = require('shortid');

const docker = new Docker();

exports.ps = (name) =>
  docker.command(`ps --filter "name=${name}"`);

exports.build = (dockerfile, app, name) =>
  docker.command(`build -t ${name} -f ${dockerfile} ${app}`);

exports.rm = (containerIds) =>
  docker.command(`rm -f ${containerIds.join(' ')}`);

exports.stats = (containerIds) =>
  docker.command(`stats --no-stream ${containerIds.join(' ')}`);

exports.run = (name) =>
  docker.command(`run -P --detach -it --rm --name ${name}${shortid.generate()} ${name}`);

exports.logs = (containerId) =>
  docker.command(`logs -t --details ${containerId}`);


exports.getContainerIds = (name) => exports.ps(name).then(({ containerList }) => {
  return containerList.map((c) => c['container id']);
});
