const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: {
      runMode: 3,
      openMode: 2,
    },
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});