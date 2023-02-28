const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    },
    specPattern: 'src/e2e/**/*.{js,jsx,ts,tsx,feature}',
    supportFile: 'src/support/e2e.js'
  },
  video: false
})
