const vorpal = require('vorpal')();
const Build = require('./lib/cmd/build');
const Run = require('./lib/cmd/run');

vorpal.delimiter('demonitor$').show();

vorpal
  .command('build', 'Build a Docker Image from a given Dockerfile and an application')
  .option('--dockerfile <path>', 'Path to Dockerfile')
  .option('--app <path>', 'Path to application')
  .option('--name <name>', 'Application name')
  .action(Build.action)
  .cancel(Build.cancel);

vorpal
  .command('run', 'Start one or more instances of an application')
  .option('--name <name>', 'Application name')
  .option('--instances <instances>', 'Number of instances')
  .action(Run.action)
  .cancel(Run.cancel);
