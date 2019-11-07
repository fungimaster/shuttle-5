var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_GIT_USERNAME: '"WF1102-091"',
  VUE_APP_GIT_PASSWORD: '"ghj3h5"'  
})
