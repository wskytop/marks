const fs = require('fs');

fs.access('nodejs', fs.constants.R_OK, (err) => {
  console.log(`${err ? 'does not exist' : 'exists'}`);
});
