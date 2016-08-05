// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['client.spec.js'],
  useAllAngular2AppRoots: true
}
