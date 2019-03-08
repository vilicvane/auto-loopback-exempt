const isAdmin = require('is-admin');

const {
  SERVICE_NAME,
  SERVICE_DISPLAY_NAME,
  SERVICE_DESCRIPTION,
  SERVICE_EXECUTABLE,
  SERVICE_SCRIPT,
} = require('./constants');
const {nssm} = require('./nssm');
const {main} = require('./utils/main');

main(async () => {
  let beingAdmin = await isAdmin();

  if (!beingAdmin) {
    console.error('Please re-run the command with administrative privileges.');
    return 1;
  }

  console.info(`Installing ${SERVICE_DISPLAY_NAME} Service...`);

  try {
    nssm('stop', SERVICE_NAME);
  } catch (error) {
    if (!/has not been started|does not exist/.test(error.message)) {
      throw error;
    }
  }

  try {
    nssm('remove', SERVICE_NAME, 'confirm');
  } catch (error) {
    if (!/does not exist/.test(error.message)) {
      throw error;
    }
  }

  nssm('install', SERVICE_NAME, SERVICE_EXECUTABLE, SERVICE_SCRIPT);

  nssm(
    'set',
    SERVICE_NAME,
    `AppEnvironmentExtra`,
    `LOCALAPPDATA=${process.env.LOCALAPPDATA}`,
  );
  nssm('set', SERVICE_NAME, 'AppDirectory', __dirname);
  nssm('set', SERVICE_NAME, 'DisplayName', SERVICE_DISPLAY_NAME);
  nssm('set', SERVICE_NAME, 'Description', SERVICE_DESCRIPTION);

  console.info(
    'Service installed, you can make changes to the service in the prompting NSSM dialog or click "cancel" to use defaults.',
  );

  nssm('edit', SERVICE_NAME);

  console.info('Starting service...');

  nssm('start', SERVICE_NAME);

  console.info('Service has been successfully started.');

  return 0;
});
