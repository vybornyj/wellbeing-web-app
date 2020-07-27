// const withPWA = require('next-pwa')
const path = require('path')
const { publicRuntimeConfig, serverRuntimeConfig } = require('./.app/env.js')

module.exports = {
  publicRuntimeConfig,
  serverRuntimeConfig,
  compress: false, // Node.js compression
  poweredByHeader: false, // x-powered-by: Next.js
  webpack(config) {
    config.resolve = {
      ...(config?.resolve ?? {}),
      modules: [path.resolve(__dirname), 'node_modules']
    }
    return config
  }
  // pwa: {
  //   dest: 'public',
  //   distDir: 'public',
  //   disable: process.env.NODE_ENV !== 'production',
  //   register: false,
  //   skipWaiting: false
  // }
}
