const {spawnWinser} = require('./spawn-winser');

console.info('Uninstalling Auto Loopback Exempt Service...');

spawnWinser('--remove', '--stop', '--silent').then(
  () => {
    process.exit();
  },
  error => {
    console.error(error);
    process.exit(1);
  },
);
