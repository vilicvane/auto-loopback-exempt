const ChildProcess = require('child_process');
const Path = require('path');

const NSSM_EXECUTABLE = Path.join(__dirname, '../bin/nssm.exe');

function nssm(...args) {
  let {error, stderr, status} = ChildProcess.spawnSync(NSSM_EXECUTABLE, args, {
    encoding: 'utf16le',
  });

  if (error) {
    throw error;
  }

  if (status !== 0) {
    throw new Error(stderr.trim());
  }
}

exports.nssm = nssm;
