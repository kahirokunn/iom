const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:site", content: "@nuxt_js" },
      { hid: 'description', name: 'description', content: pkg.description },
      {
        property: 'og:image',
        content: 'http://www.kahirookina.com/ogp.jpg',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/stylesheet/style.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://github.com/nuxt-community/modules
    '@nuxtjs/font-awesome',
    // Doc: https://www.npmjs.com/package/@nuxtjs/onesignal
    '@nuxtjs/onesignal',
    // Doc: https://github.com/nuxt-community/pwa-module
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/toast
    '@nuxtjs/toast',
  ],
  /*
  ** Axios module configuration
  */
  axios: { proxy: true },
  toast: { position: 'top-center' },

  proxy: {
    '/api': {
      target: 'https://private-475fb3-iom1.apiary-mock.com/',
    }
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev }) {
      // Run ESLint on save
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  manifest: {
    name: 'iom',
    short_name: 'iom',
    title: 'iom',
    'og:title': 'iom',
    'og:description': 'iom',
    description: 'Internet of management',
    lang: 'ja',
    theme_color: '#ffffff',
    background_color: '#ffffff',
  },

  oneSignal: {
    init: {
      appId: process.env.ONE_SIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: { disable: true },
    },
  },

  //開発環境でもPWAできるように
  workbox: { dev: true },

  render: {
    http2: { push: true },
    static: {
      maxAge: '1h',
      setHeaders(res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
        }
      },
    },
  },
}
