const parseArgs = require("minimist")
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000"
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost"

const siteInfo = {
  title: "The Portfolio of Aqui.TCD",
  description: "これは AquiTCD のエンジニアとしてのポートフォリオです。今まで個人で開発したもの、活動履歴、スキルセット、考えていることなどを公表しています。",
  ogpImage: "ogp.png",
  baseUrl: "https://aquitcd.github.io",
  locale: "ja_JP",
  twitterId: 'AquiTCD',
  searchConsole: 'eRq3hmhxlmrqYtKIs88-4pmdyrEIQJO7X6aw5TsJJtw'
}
module.exports = {
  env: {
    baseUrl:
      process.env.BASE_URL ||
      `http://${host}:${port}`
  },
  mode: 'spa',
  generate: {
    dir: 'docs'
  },
  head: {
    title: siteInfo.title,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0' },
      { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: siteInfo.description },
      // OGP
      { hid: 'og:site_name', property: 'og:site_name', content: siteInfo.title },
      { hid: 'og:type', property: 'og:type', content: 'artice' },
      { hid: 'og:url', property: 'og:url', content: siteInfo.baseUrl },
      { hid: 'og:title', property: 'og:title', content: siteInfo.title },
      { hid: 'og:description', property: 'og:description', content: siteInfo.description },
      { hid: 'og:image', property: 'og:image', content: `${siteInfo.baseUrl}/${siteInfo.ogpImage}` },
      { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
      { hid: 'og:image:height', property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: siteInfo.locale },
      //- OGP Facebook
      // { property: 'fb:app_id', content: '' },
      //- OGP Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      // { name: 'twitter:site', content: '@site'},
      { name: 'twitter:creator', content: siteInfo.twitterId },
      { name: 'twitter:description', content: siteInfo.description },
      // { name: 'twitter:image', content: siteInfo.ogpImage },
      // Google Search Console
      { name: 'google-site-verification', content: siteInfo.searchConsole },
    ],
    link: [
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "apple-touch-icon",
        href: "/kamon.png"
      },
      // {
      //   rel: 'canonical',
      //   href: "/favicon.ico"
      // },
      // {
      //   rel: "alternate",
      //   type: "application/rss+xml",
      //   href: "/rss"
      // },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
        integrity: "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
        crossorigin: "anonymous"
      },
    ]
  },
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#d50000" },
  /*
  ** Build configuration
  */
  css: ['ress',"~/assets/styles/main.sass"],
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: ['json-loader', 'yaml-loader']
      })
    }
  },
  modules: [
    "@nuxtjs/axios",
    "~/modules/typescript.js",
    ['nuxt-sass-resources-loader']
  ],
  sassResources: [
    '~/assets/styles/_config.sass'
  ],
  axios: {}
}
