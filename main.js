const ChildProcess = require('child_process');
const FS = require('fs');
const Path = require('path');

const CHANGE_DEBOUNCE_TIMEOUT = 5000;

const packagesDirPath = Path.join(process.env.LOCALAPPDATA, 'Packages');

initializeWatcher();

exemptAll().catch(console.error);

function initializeWatcher() {
  let timerMap = new Map();

  FS.watch(packagesDirPath, {recursive: false}).addListener(
    'change',
    (type, fileName) => {
      if (type !== 'rename') {
        return;
      }

      let valid = filterPackageName(fileName);

      let timer = timerMap.get(fileName);

      clearTimeout(timer);

      if (valid) {
        timer = setTimeout(() => {
          exempt(fileName);
        }, CHANGE_DEBOUNCE_TIMEOUT);

        timerMap.set(fileName, timer);
      } else {
        timerMap.delete(fileName);
      }
    },
  );
}

async function exemptAll() {
  let packageNames = FS.readdirSync(packagesDirPath).filter(filterPackageName);

  for (let packageName of packageNames) {
    await exempt(packageName);
  }
}

function filterPackageName(packageName) {
  let packagePath = Path.join(packagesDirPath, packageName);

  let stats = FS.statSync(packagePath);

  return !!stats && stats.isDirectory();
}

async function exempt(packageName) {
  let cp = ChildProcess.spawn('CheckNetIsolation.exe', [
    'LoopbackExempt',
    '-a',
    `-n=${packageName}`,
  ]);

  return new Promise((resolve, reject) => {
    cp.on('error', reject).on('exit', code => {
      if (code) {
        console.info(`Error exempting "${packageName}", exit code ${code}.`);
      } else {
        console.info(`Successfully exempted "${packageName}".`);
      }

      resolve();
    });
  });
}
