'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY : '"AIzaSyBQbJhf9grzoVqRtFDnD8KPcf7dpem8xaA"'
})
