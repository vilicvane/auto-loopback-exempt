const isAdmin = require('is-admin');
const {main} = require('main-function');

const {SERVICE_NAME, SERVICE_DISPLAY_NAME} = require('./constants');
const {nssm} = require('./nssm');

main(async () => {
  let beingAdmin = await isAdmin();

  if (!beingAdmin) {
    console.error('Please re-run the command with administrative privileges.');
    return 1;
  }

  console.info(`Removing "${SERVICE_DISPLAY_NAME}" Service...`);

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

  console.info('Service has been successfully removed.');

  return 0;
});
