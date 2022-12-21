/* eslint-disable @typescript-eslint/no-var-requires */
const featureTemplate = require('./src/templates/feature/index')
const componentTemplate = require('./src/templates/component/index')
const apiTemplate = require('./src/templates/api/index')
const providerTemplate = require('./src/templates/provider/index')

module.exports = function (plop) {
  plop.setGenerator('feature', featureTemplate)
  plop.setGenerator('component', componentTemplate)
  plop.setGenerator('provider', providerTemplate)
  plop.setGenerator('api', apiTemplate)
}
