const fs = require('fs');
const path = require('path');

const projectPath = path.resolve(__dirname, '../../../');

const code = `
  export default {
    origin: typeof window !== "undefined" ? window.location.origin : '',
    backend: 'laravel'
  }
`;

fs.access(projectPath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error(`${projectPath} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
  } else {
    fs.writeFileSync(`${projectPath}/restify.config.js`, code, 'utf8');

    console.log('restify.config.js file has been created successfully.');
  }
});