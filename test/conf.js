// conf.js
exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    // 'browserName': 'internet explorer', - special installation needed
    // 'version':'10',
    'browserName': 'chrome',
    //'browserName': 'firefox'
  },
  baseUrl:'http://127.0.0.1:4200',
  specs: ['client.spec.js', 'stats.spec.js'],
  useAllAngular2AppRoots: true,

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
}
