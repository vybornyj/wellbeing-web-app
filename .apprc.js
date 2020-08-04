const fs = require('fs')
const path = require('path')
const packageJson = require('./package.json')

let env = {
  publicRuntimeConfig: {
    URL_STATIC: '',
    API_PUBLIC_KEY_STRIPE: ''
  },
  serverRuntimeConfig: {
    PATH_STATIC: '',
    API_KEY_STRIPE: '',
    PG_CONFIG: {
      host: '',
      port: 0,
      user: '',
      password: '',
      database: ''
    },
    NODEMAILER_CONFIG: {
      host: '',
      port: 0,
      secure: true,
      auth: {
        user: '',
        pass: ''
      }
    }
  }
}

const PATH_APP = path.resolve()

try {
  const envFile = '/app-config/env/wellbeing.env.js'
  if (fs.existsSync(envFile)) env = require(envFile)
} catch (err) {
  // console.error(err)
}

const URL_APP = process.argv[2]
const RUNTIME_IS_PRODUCTION = process.argv[3] !== 'dev'
const { publicRuntimeConfig, serverRuntimeConfig } = env
const RUNTIME_BUILD = new Date().toISOString()
const RUNTIME_VERSION = packageJson.version

const dotApp = `${PATH_APP}/.app`
const dotAppEnv = `${dotApp}/env.js`
const LOG_ERROR = `${dotApp}/error.log`
const LOG_WARN = `${dotApp}/warn.log`

const appConfig = {
  publicRuntimeConfig: {
    RUNTIME_IS_PRODUCTION,
    RUNTIME_VERSION,
    RUNTIME_BUILD,
    URL_APP,
    ...publicRuntimeConfig
  },
  serverRuntimeConfig: {
    LOG_ERROR,
    LOG_WARN,
    PATH_APP,
    ...serverRuntimeConfig
  }
}

fs.rmdir(dotApp, { recursive: true }, () => {
  fs.mkdir(dotApp, () => {
    fs.writeFileSync(dotAppEnv, `module.exports = ${JSON.stringify(appConfig)}`)

    const logFirstLine = `${RUNTIME_IS_PRODUCTION ? `Version ${RUNTIME_VERSION} · Build` : 'Development'} ${RUNTIME_BUILD}\n`
    fs.writeFileSync(LOG_ERROR, logFirstLine)
    fs.writeFileSync(LOG_WARN, logFirstLine)
  })
})
