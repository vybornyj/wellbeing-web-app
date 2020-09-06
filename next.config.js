const { publicRuntimeConfig, serverRuntimeConfig } = require('./.app/env.js')

module.exports = {
  publicRuntimeConfig,
  serverRuntimeConfig,
  compress: false,
  devIndicators: {
    autoPrerender: false
  },
  poweredByHeader: false,
  reactStrictMode: false
}
