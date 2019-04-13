const vorpal = require('vorpal')();
const Build = require('./lib/cmd/build');
const Run = require('./lib/cmd/run');
const Kill = require('./lib/cmd/kill');
const Validate = require('./lib/cmd/validate');
const Monitor = require('./lib/cmd/monitor');
const Logs = require('./lib/cmd/logs');
const Config = require('./config.json');

vorpal.delimiter(`${Config.appName}$`).show();

vorpal
  .command('build', 'Build a Docker Image from a given Dockerfile and an application')
  .option('--dockerfile <path>', 'Path to Dockerfile')
  .option('--app <path>', 'Path to application')
  .option('--name <name>', 'Application name')
  .action(Build.action);

vorpal
  .command('run', 'Start one or more instances of an application')
  .option('--name <name>', 'Application name')
  .option('--instances <instances>', 'Number of instances')
  .action(Run.action);

vorpal
  .command('kill', 'Kill all instances of an application')
  .option('--name <name>', 'Application name')
  .action(Kill.action);

vorpal
  .command('validate', 'Validate that the container instances are running')
  .option('--name <name>', 'Application name')
  .action(Validate.action);

vorpal
  .command('monitor', 'Monitor the resource usage of each container (CPU, I/O, etc)')
  .option('--name <name>', 'Application name')
  .action(Monitor.action);

vorpal
  .command('logs', 'Consolidate the log output of all the container instances into one centralized log file')
  .option('--name <name>', 'Application name')
  .action(Logs.action);
