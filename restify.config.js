export default {
  origin: (typeof window !== "undefined") ? window.location.origin : 'http://localhost:8000',
  backend: 'laravel'
}

/**
 * Add to package.json file "scripts" section if want package generate config file on installation
 *
 * "postinstall": "node ./scripts/config.file.js"
 *
 **/