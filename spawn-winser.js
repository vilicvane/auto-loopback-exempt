const ChildProcess = require('child_process');

const v = require('villa');
const which = require('npm-which')(__dirname);

require('villa/platform/node');

const WINSER_EXECUTABLE = which.sync('winser');

console.log(WINSER_EXECUTABLE);

async function spawnWinser(...args) {
  let cp = ChildProcess.spawn(WINSER_EXECUTABLE, args);

  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);

  await v.awaitable(cp);
}

exports.spawnWinser = spawnWinser;
