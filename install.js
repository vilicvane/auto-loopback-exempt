const {spawnWinser} = require('./spawn-winser');

console.info('Installing Auto Loopback Exempt Service...');

spawnWinser(
  '--install',
  '--autostart',
  '--silent',
  '--displayname',
  'Auto Loopback Exempt',
  '--env',
  `LOCALAPPDATA="${process.env.LOCALAPPDATA}"`,
).then(
  () => {
    process.exit();
  },
  error => {
    console.error(error);
    process.exit(1);
  },
);
