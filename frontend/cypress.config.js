const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    supportFile : false,
    setupNodeEvents(on, config) {},
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*'],
  },
})
