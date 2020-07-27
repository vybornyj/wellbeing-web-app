interface GetConfig {
  publicRuntimeConfig: {
    RUNTIME_IS_PRODUCTION: boolean
    RUNTIME_VERSION: string
    RUNTIME_BUILD: string
    URL_APP: string

    URL_STATIC: string
    API_PUBLIC_KEY_STRIPE: string
  }
  serverRuntimeConfig: {
    LOG_ERROR: string
    LOG_WARN: string
    PATH_APP: string

    PATH_STATIC: string
    API_KEY_STRIPE: string
    PG_CONFIG: {
      host: string
      port: number
      user: string
      password: string
      database: string
    }
    NODEMAILER_CONFIG: {
      host: string
      port: number
      secure: true
      auth: {
        user: string
        pass: string
      }
    }
  }
}
