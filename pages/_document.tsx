// https://realfavicongenerator.net
// http://romannurik.github.io/AndroidAssetStudio/index.html
import getConfig from 'next/config'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const { publicRuntimeConfig }: GetConfig = getConfig()

class AppDocument extends Document<{ lang: lang }> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, lang: ctx?.query?.lang ?? 'ru' }
  }

  render = () => {
    const appName = 'Wellbeing'
    const appMainColor = '#00a300'
    const { lang } = this.props

    return (
      <Html lang={lang} dir='ltr'>
        <Head>
          <meta name='application-name' content={appName} />
          <meta name='apple-mobile-web-app-title' content={appName} />

          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-capable' content='yes' />

          <meta name='theme-color' content={appMainColor} />
          <meta name='apple-mobile-web-app-status-bar-style' content={appMainColor} />

          <meta name='format-detection' content='telephone=no' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />

          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png?v=jwEkP6xkdY' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png?v=jwEkP6xkdY' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png?v=jwEkP6xkdY' />
          <link rel='manifest' href='/site.webmanifest?v=jwEkP6xkdY' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg?v=jwEkP6xkdY' color={appMainColor} />
          <link rel='shortcut icon' href='/favicon.ico?v=jwEkP6xkdY' />

          {/* фон плитки приложения windows start */}
          <meta name='msapplication-TileColor' content={appMainColor} />

          {/* скачиваю гугл шрифт */}
          <link rel='preload' href='https://fonts.googleapis.com/css?family=Fira+Sans:400,600&display=swap&subset=cyrillic' as='style' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Fira+Sans:400,600&display=swap&subset=cyrillic' />

          {/* применяю шрифт сразу же, что бы он отрисовался сразу после загрузки */}
          <style dangerouslySetInnerHTML={{ __html: `html { font-family: 'Fira Sans', sans-serif; }` }} />
        </Head>
        <body>
          <div id='__background' />
          {
            /* запрещаю официальный браузерный плагин реакта в продакшене */
            publicRuntimeConfig.RUNTIME_IS_PRODUCTION && (
              <script
                dangerouslySetInnerHTML={{
                  __html: 'if (window?.__REACT_DEVTOOLS_STORE_HOOK__) window.__REACT_DEVTOOLS_STORE_HOOK__.inject = function () {}'
                }}
              />
            )
          }
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
