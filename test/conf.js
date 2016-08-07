// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    // 'browserName': 'internet explorer', - special installation needed
    // 'version':'10',
    'browserName': 'chrome',
    //'browserName': 'firefox'
  },
  baseUrl:'http://127.0.0.1:8080',
  specs: ['client.spec.js'],
  useAllAngular2AppRoots: true
}
